"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Variaveis que serão utilizadas
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
//-------------------------------------------------
//EVENTO: submit do botao pesquisar, com função de callback sendo assincrona
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); //Pra impedir a pagina de recarregar quando submit
    if (!input)
        return; //se nao achar nenhum input, sairá do evento
    //armazenar a localizacao passada no input
    const localizacao = input.value;
    //se a localizacao for muito pequena, sair do evento
    if (localizacao.length < 3) {
        alert("O local precisa ter, pelo menos, 3 letras.");
        return;
    }
    //-------------------------------------------------
    //Fazer uma requisiçao com a nossa localizacao (Retorno em string)
    const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=58c9d3fd3239bb6aa4e5f120e2e4f31c&lang=pt_br&units=metrics`);
    const dados = yield resposta.json(); //Passando a string pra .json
}));
