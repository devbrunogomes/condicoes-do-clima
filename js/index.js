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
const body = document.body;
const allElements = document.querySelectorAll('*');
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
            diaOuNoite: dados.weather[0].icon[2],
        };
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
        //-------------------------------------------------
        //Renderizacao condicional do background
        //Se for dia
        if (infos.diaOuNoite === 'd') {
            body.style.background = 'url("https://wallpapers.com/images/hd/minimalist-sky-1920-x-1080-wallpaper-5fjtp2iuk6xe26vr.jpg") 50% no-repeat';
            body.style.backgroundSize = 'cover';
            body.style.color = 'rgb(85, 84, 84)';
            //Se for noite
        }
        else {
            body.style.background = 'url("https://wallpapers.com/images/hd/1080p-minimalist-mi6b6czbcc2ybhj4.jpg") 50% no-repeat';
            body.style.backgroundSize = 'cover';
            body.style.color = 'white';
        }
    }
    catch (error) {
        //se a requisicao der error, exibir o erro
        alert("Erro na obtenção da API :( Digitou um nome errado, ou inválido?");
        console.log(`Deu erro na obtençao da API. Erro: ${error}`);
    }
    finally {
        console.log(`Finished`);
    }
}));
