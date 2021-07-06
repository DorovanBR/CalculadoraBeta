    // Define a constante de Jobs

        const Jobs = {}

    // Função com as Operações Básicas de uma Calculadora

        function OperacoesBasicas(Valor1, Valor2, Funcao){
            if(Valor1 == ""){
                Valor1 = 0;
            }
            if(Valor2 == ""){
                Valor2 = 0;
            }

            switch(Funcao){
                case "soma": case "+":
                    return parseFloat(Valor1)+parseFloat(Valor2);
                case "subtrai": case "-":
                    return parseFloat(Valor1)-parseFloat(Valor2);
                case "dividi": case "/":
                    return parseFloat(Valor1)/parseFloat(Valor2);
                case "multiplica": case "x": case "X":
                    return parseFloat(Valor1)*parseFloat(Valor2);
            }
        } 
    
    // Função da Memoria da Calculadora

        function OperacoesMemoria(Resultado, Memoria, Funcao){
            if(Resultado == ""){
                Resultado = 0;
            }
            if(Memoria == ""){
                Memoria = 0;
            }
            switch(Funcao){
                case "adiciona":
                    return parseFloat(Memoria)+parseFloat(Resultado);
                case "subtrai":
                    return parseFloat(Memoria)-parseFloat(Resultado);
                case "resultado":
                    return parseFloat(Memoria);
                case "limpa":
                    return 0;
            }
        }

    // Função para Retornar a Data e Hora

        function RetornaDataHora(){
            var Data = new Date();
            var spanDataHora = $("#span-DataHora");

            return spanDataHora.html(Data.toLocaleString())
        }

    // Função para Alterar o Tema

        function AlteraTema(TemaAtual, TemaNovo){
            // Altera o Tema Atual dos Datasets
                $("button[data-tema-atual='"+TemaAtual+"']").each(function(i, item){
                    $(item).attr("data-tema-atual", TemaNovo);
                });

            // Altera o Tema da Pagina
                $("."+TemaAtual).each(function(i, item){
                    $(item).removeClass(TemaAtual);
                    $(item).addClass(TemaNovo);
                });
        }


jQuery(document).ready(function($) {

    // Executa os processos ao finalizar o carregamento da pagina

        $(document).ready(()=>{
            Jobs["DataHora"] = window.setInterval(RetornaDataHora, 500);
        })

    // Trata os Botões de Ligar/Desligar da Calculadora

        $(document).on("click", "button[name='btn-calculadoraOnOff']", (e)=>{
            // Declara as Variaveis
                var EventoAtual = e.currentTarget;
                var Status = EventoAtual.dataset.status;
            
            // Desativa o Botão Atual
                $("button[data-status='"+Status+"']").prop('disabled', true);
            
            // Verifica o Status
                switch(Status){
                    case "on":
                        // Desativa o Job DataHora
                            clearInterval(Jobs["DataHora"]);
                            delete(Jobs["DataHora"]);

                        // Ativa o Outro Botão
                            $("button[data-status='off']").prop('disabled', false);

                        // Ativa os Campos
                            $("input[name='input-valor1']").prop('disabled', false);
                            $("button[name='btn-funcaoMemoria-input-valor']").prop('disabled', false);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', false);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', false);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', false);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', false);
                            $("input[name='input-valor2']").prop('disabled', false);
                            $("button[name='btn-funcaoMemoria-input-valor']").prop('disabled', false);
                            $("button[name='btn-funcaoMemoria']").prop('disabled', false);
                            $("button[name='btn-funcaoMemoria']").prop('disabled', false);
                            $("button[name='btn-funcaoMemoria']").prop('disabled', false);
                            $("input[name='input-memoria']").prop('disabled', false);
                            $("input[name='input-resultado']").prop('disabled', false);

                        // Exibe/Oculta Divs
                            $("#div-calculadoraVerso").hide();
                            $("#div-dorovania").show();
                            $("#div-calculadoraCampos").show();
                            $("#div-calculadoraBotoesMemoria").show();
                            $("#div-calculadoraMemoria").show();
                            $("#div-calculadoraResultado").show();
                        break;
                    case "off":
                        // Reativa o Job DataHora
                            Jobs["DataHora"] = window.setInterval(RetornaDataHora, 500);

                        // Ativa o Outro Botão
                            $("button[data-status='on']").prop('disabled', false);

                        // Desativar os Campos
                            $("input[name='input-valor1']").prop('disabled', true);
                            $("button[name='btn-funcaoMemoria-input-valor']").prop('disabled', true);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', true);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', true);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', true);
                            $("button[name='btn-funcaoCalculadora']").prop('disabled', true);
                            $("input[name='input-valor2']").prop('disabled', true);
                            $("button[name='btn-funcaoMemoria-input-valor']").prop('disabled', true);
                            $("button[name='btn-funcaoMemoria']").prop('disabled', true);
                            $("button[name='btn-funcaoMemoria']").prop('disabled', true);
                            $("button[name='btn-funcaoMemoria']").prop('disabled', true);
                            $("input[name='input-memoria']").prop('disabled', true);
                            $("input[name='input-resultado']").prop('disabled', true);

                        // Exibe/Oculta Divs
                            $("#div-calculadoraVerso").show();
                            $("#div-dorovania").hide();
                            $("#div-calculadoraCampos").hide();
                            $("#div-calculadoraBotoesMemoria").hide();
                            $("#div-calculadoraMemoria").hide();
                            $("#div-calculadoraResultado").hide();
                        break;
                }
        })

    // Trata a Funcionalidade dos Botões de Funções Básicas

        $(document).on("click", "button[name='btn-funcaoCalculadora']", (e)=>{
            // Declara as Variaveis
                var Valor1 = $("input[name='input-valor1']");
                var Valor2 = $("input[name='input-valor2']");
                var Funcao = e.currentTarget.dataset.funcao;
                var Resultado = $("input[name='input-resultado']");

            // Aplica o Resultado
                Resultado.val(OperacoesBasicas(Valor1.val(), Valor2.val(), Funcao));
        })
    
    // Trata a Funcionalidade dos Botões de Operações Básicas da Memoria

        $(document).on("click", "button[name='btn-funcaoMemoria']", (e)=>{
            // Declara as Variaveis
                var Funcao = e.currentTarget.dataset.funcao;
                var Memoria = $("input[name='input-memoria']");
                var Resultado = $("input[name='input-resultado']");

            // Aplica o Resultado
                Memoria.val(OperacoesMemoria(Resultado.val(), Memoria.val(), Funcao));
        })

    // Trata a Funcionalidade dos Botões Do Resultado da Memoria

        $(document).on("click", "button[name='btn-funcaoMemoria-input-valor']", (e)=>{
            // Declara as Variaveis
                var Funcao = e.currentTarget.dataset.funcao;
                var Input = e.currentTarget.dataset.input;
                var Memoria = $("input[name='input-memoria']");
                var Resultado = $("input[name='input-resultado']");

            // Aplica a Memoria no Campo selecionado
                $("input[name='input-valor"+Input+"']").val(OperacoesMemoria(Resultado.val(), Memoria.val(), Funcao));
        })

    // Trata a Funcionalidade dos Botões de Tema

        $(document).on("click", "button[name='btn-mudaTema']", (e)=>{
            // Declara as Variaveis
                var TemaNovo = e.currentTarget.dataset.tema;
                var TemaAtual = e.currentTarget.dataset.temaAtual;

            // Aplica o novo Tema
                AlteraTema(TemaAtual, TemaNovo);
        })

})