const Dorovania = {
	sintetizador : window.speechSynthesis,
	voz : new window.SpeechSynthesisUtterance(),
	reconhecedor : new window.webkitSpeechRecognition(),
	conhecimento : new webkitSpeechGrammarList(),
	inteligencia : [],
	mensagensRecebidas : [],
	mensagensProgramadas : [
		{
			callback: null,
			tipoCallback: null,
			mensagem: "Olá, sou a assistente virtual Dorovania, em que posso ajudá-lo?",
			gatilhos : [],
		},{
			callback: ()=>{
				escutaMensagem();
			},
			tipoCallback: null,
			mensagem: "Desculpe, não entendi, pode repetir por favor?",
			gatilhos : []
		},{
			callback: null,
			tipoCallback: null,
			mensagem: "Meu nome é Dorovania, sou uma assistente virtual criada para auxiliar com a Calculadora Master",
			gatilhos : ["quem é você","fale me sobre você","fale-me sobre você","me conte sobre você","fale de você"]
		},{
			callback: null,
			tipoCallback: null,
			mensagem: "Ainda estou aprendendo, mas o que já sei posso te ajudar",
			gatilhos : ["pode me ajudar", "preciso da sua ajuda", "preciso de ajuda", "pode ajudar"]
		},{
			callback: null,
			tipoCallback: null,
			mensagem: "Nossa que feio, isto foi muito deselegante!",
			gatilhos : ["*"]
		},{
			callback: (parametros = {})=>{
				var Resultado = $("input[name='input-resultado']");

				Resultado.val(OperacoesBasicas(parametros.Valor1, parametros.Valor2, parametros.Funcao));
			},
			tipoCallback: "Calculo",
			mensagem: "O Resultado da sua Operação é [resultado]",
			gatilhos : ["+", "-", "/", "x", "X"]
		}
	]
}

function iniciaDorovania(codigo, pausaCotinua, debug = false){
	var listaVozes = Dorovania.sintetizador.getVoices();
	Dorovania.voz.voice = listaVozes[codigo];
	Dorovania.reconhecedor.continuos = pausaCotinua;
	Dorovania.reconhecedor.maxAlternatives = 100;
	Dorovania.reconhecedor.onresult = function(event){
		Dorovania.inteligencia.push(event);
		for (var i = event.resultIndex; i < event.results.length; i++) {
			if(event.results[i].isFinal){
				Dorovania.mensagensRecebidas.push((event.results[i][0].transcript).toLowerCase());
			} else {
				Dorovania.mensagensRecebidas.push((event.results[i][0].transcript).toLowerCase());
			}
		}
		document.getElementById("info-mensagem").innerHTML = Dorovania.mensagensRecebidas;
		pensaResposta();
	}
	Dorovania.reconhecedor.onstart = function(event){
		Dorovania.voz.text = document.getElementById("info-status").innerHTML = "Ok, pode falar...";
		reproduzMensagem();
		if(debug){
			console.log("Log onStart",event);
		}
	}
	Dorovania.reconhecedor.onend = function(event){
		document.getElementById("info-status").innerHTML = "Ok, vamos lá";
		if(debug){
			console.log("Log onEnd",event);
		}
	}
	Dorovania.reconhecedor.onnomatch = function(event) {
		document.getElementById("info-status").innerHTML = "Não entendi o que falou";
		if(debug){
			console.log("Log onnomatch",event);
		}
	}
	Dorovania.reconhecedor.onspeechstart = function(event){
		document.getElementById("info-status").innerHTML = "Estou te escutando";
		if(debug){
			console.log("Log onspeechstart",event);
		}
	}
	Dorovania.reconhecedor.onspeechend = function(event){
		document.getElementById("info-status").innerHTML = "Ok, estou pensando, so um momento";
		if(debug){
			console.log("Log onspeechend",event);
		}
	}
	// Dorovania.reconhecedor.onsoundstart = function(event){
	// 	console.log("Log onsoundstart",event);
	// }
	// Dorovania.reconhecedor.onsoundend = function(event){
	// 	console.log("Log onsoundend",event);
	// }
	// Dorovania.reconhecedor.onaudiostart = function(event){
	// 	console.log("Log onaudiostart",event);
	// }
	// Dorovania.reconhecedor.onaudioend = function(event){
	// 	console.log("Log onaudioend",event);
	// }
	Dorovania.voz.text = Dorovania.mensagensProgramadas[0].mensagem
	window.setTimeout(reproduzMensagem, 100);
}

function escutaMensagem(){
	Dorovania.reconhecedor.start();
}

function pensaResposta(){
	var totalMensagensRecebidas = Dorovania.mensagensRecebidas.length;
	var totalMensagensProgramadas = Dorovania.mensagensProgramadas.length;
	for(ponteiroMensagensRecebidas = 0; ponteiroMensagensRecebidas < totalMensagensRecebidas; ponteiroMensagensRecebidas++){
		for(ponteiroMensagensProgramadas = 0; ponteiroMensagensProgramadas < totalMensagensProgramadas; ponteiroMensagensProgramadas++){
			var totalSinalizadores = Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].gatilhos.length;
			if(totalSinalizadores > 0){
				for(ponteiroSinalizadores = 0; ponteiroSinalizadores < totalSinalizadores; ponteiroSinalizadores++){	
					if(Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].indexOf(Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].gatilhos[ponteiroSinalizadores]) > -1){
						var valores = Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].replace(/\s/g, "").replace(/['+']|['-']|['/']|['x']|['X']/g, '|').split("|");
						var funcao = Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].replace(/\s/g, "").replace(valores[0], "").replace(valores[1], "");
						
						if(typeof Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].callback == "function" && Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].tipoCallback == "Calculo"){
							Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].callback({
								Valor1: valores[0],
								Valor2: valores[1],
								Funcao: funcao
							})
						}

						Dorovania.voz.text = Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].mensagem;
						
						var Condicao1 = Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].indexOf("+") > -1 || Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].indexOf("-") > -1 || Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].indexOf("/") > -1 || Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].indexOf("x") > -1 || Dorovania.mensagensRecebidas[ponteiroMensagensRecebidas].indexOf("X") > -1;
						
						if(Condicao1){
							if(Dorovania.voz.text.indexOf("[resultado]") > -1){
								Dorovania.voz.text = (Dorovania.voz.text).replace("[resultado]", $("input[name='input-resultado']").val());
							}
						}

						Dorovania.mensagensRecebidas = [];
						if(typeof Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].callback == "function" && Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].tipoCallback != "Calculo"){
							return window.setTimeout(reproduzMensagem, 100) && window.setTimeout(Dorovania.mensagensProgramadas[ponteiroMensagensProgramadas].callback, 3000);
						} else {
							return window.setTimeout(reproduzMensagem, 100);
						}
					}
				}
			}
		}
	}
	Dorovania.voz.text = Dorovania.mensagensProgramadas[1].mensagem;
	Dorovania.mensagensRecebidas = [];
	if(typeof Dorovania.mensagensProgramadas[1].callback == "function"){
		return window.setTimeout(reproduzMensagem, 1) && window.setTimeout(Dorovania.mensagensProgramadas[1].callback, 3000);
	} else {
		return window.setTimeout(reproduzMensagem, 1);
	}
}

function reproduzMensagem(){
	Dorovania.sintetizador.speak(Dorovania.voz);
	Dorovania.voz.text = "";
}