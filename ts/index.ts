//Variaveis que serão utilizadas
const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
const sectionWeather = document.querySelector('#weather-details')
//-------------------------------------------------

//EVENTO: submit do botao pesquisar, com função de callback sendo assincrona
form?.addEventListener("submit", async (event) => {
  event.preventDefault(); //Pra impedir a pagina de recarregar quando submit

  if (!input || !sectionTempoInfo) return; //se nao achar nenhum input, ou a section, sairá do evento
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
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=58c9d3fd3239bb6aa4e5f120e2e4f31c&lang=pt_br&units=metric`
    );

    const dados = await resposta.json(); //Passando a string pra .json
    console.log(dados)

    //Armazeno as informações que eu quero usar e que estão dentro de 'dados'
    const infos = {
      temperatura: Math.round(dados.main.temp),
      local: dados.name,
      icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
      descricao: dados.weather.description
    };

    
    //-------------------------------------------------
    
    //Aqui eu defino o conteudo HTML que vai ficar dentro da minha section, que tbm é um conteudo HTML
    sectionTempoInfo.innerHTML = `
    <div class="tempo-data">
    <h2>${infos.local}</h2>
    
    <span>${infos.temperatura}°C</span>
    </div>
    
    <img src="${infos.icone}">      
    `;
  } catch (error) {
    //se a requisicao der error, exibir o erro
    console.log(`Deu erro na obtençao da API. Erro:${error}`);
  } finally {
    console.log(`Finished`);
  }
});
