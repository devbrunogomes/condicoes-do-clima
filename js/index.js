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
const sectionTempoInfo = document.querySelector("#tempo-info");
const sectionWeatherDetails = document.querySelector("#weather-details");
//-------------------------------------------------
//EVENTO: submit do botao pesquisar, com função de callback sendo assincrona
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); //Pra impedir a pagina de recarregar quando submit
    if (!input || !sectionTempoInfo || !sectionWeatherDetails)
        return; //se nao achar nenhum input, ou a section, sairá do evento
    //armazenar a localizacao passada no input
    const localizacao = input.value;
    //se a localizacao for muito pequena, sair do evento
    if (localizacao.length < 3) {
        alert("O local precisa ter, pelo menos, 3 letras.");
        return;
    }
    //-------------------------------------------------
    try {
        //Fazer uma requisiçao com a nossa localizacao (Retorno em string)
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=58c9d3fd3239bb6aa4e5f120e2e4f31c&lang=pt_br&units=metric`);
        const dados = yield resposta.json(); //Passando a string pra .json
        //Tratamento do formato da hora: 
        //Armazenando os valores
        const sunriseTimeUnix = dados.sys.sunrise;
        const sunsetTimeUnix = dados.sys.sunset;
        //Converter para objetos Date
        const sunriseDate = new Date(sunriseTimeUnix * 1000);
        const sunsetDate = new Date(sunsetTimeUnix * 1000);
        //Formatando para exibição do horário
        const sunriseFormatted = sunriseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const sunsetFormatted = sunsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        //Armazeno as informações que eu quero usar e que estão dentro de 'dados'
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
            descricao: dados.weather[0].description.toUpperCase(),
            umidade: dados.main.humidity,
            vento: dados.wind.speed,
            tempMin: dados.main.temp_min,
            tempMax: dados.main.temp_max,
        };
        console.log(dados);
        //-------------------------------------------------
        //Aqui eu defino o conteudo HTML que vai ficar dentro da minha section, que tbm é um conteudo HTML
        sectionTempoInfo.innerHTML = `
      <div class="tempo-data">
        <h2>${infos.local}</h2>
        
        <span>${infos.temperatura}°C</span>
      </div>
      <div class="imageDescriptionWrapper">
        <img src="${infos.icone}">      
        <p>${infos.descricao}</p>
      </div>
    `;
        sectionWeatherDetails.innerHTML = `
    <div class="details-infos">
    <div class="details-data">
      <img src="./assets/temperature-quarter-svgrepo-com.svg" alt="temp min">
      <div class="wrapper">
        <h3>Temp. Min.</h3>
        <span>${infos.tempMin}°C</span>
      </div>
    </div>
    <div class="details-data">
      <img src="./assets/temperature-high-svgrepo-com.svg" alt="temp max">
      <div class="wrapper">
        <h3>Temp. Max.</h3>
        <span>${infos.tempMax}°C</span>
      </div>
    </div>
  </div>
  <hr>
  <div class="details-infos">
    <div class="details-data">
      <img src="./assets/humidity-svgrepo-com.svg" alt="umidade">
      <div class="wrapper">
        <h3>Umidade</h3>
        <span>${infos.umidade}%</span>
      </div>
    </div>
    <div class="details-data">
      <img src="./assets/air-svgrepo-com.svg" alt="vento">
      <div class="wrapper">
        <h3>Vento (m/s)</h3>
        <span>${infos.vento}m/s</span>

      </div>
    </div>
  </div>
    `;
    }
    catch (error) {
        //se a requisicao der error, exibir o erro
        console.log(`Deu erro na obtençao da API. Erro:${error}`);
    }
    finally {
        console.log(`Finished`);
    }
}));
