//Variaveis que serão utilizadas
const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");

//-------------------------------------------------

//EVENTO: submit do botao pesquisar, com função de callback sendo assincrona
form?.addEventListener("submit", async (event) => {
  event.preventDefault(); //Pra impedir a pagina de recarregar quando submit

  if (!input) return; //se nao achar nenhum input, sairá do evento

  //armazenar a localizacao passada no input
  const localizacao = input.value;

  //se a localizacao for muito pequena, sair do evento
  if (localizacao.length < 3) {
    alert("O local precisa ter, pelo menos, 3 letras.");
    return;
  }

  //-------------------------------------------------

  //Fazer uma requisiçao com a nossa localizacao (Retorno em string)
  const resposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=58c9d3fd3239bb6aa4e5f120e2e4f31c&lang=pt_br&units=metrics`
  );

  const dados = await resposta.json(); //Passando a string pra .json
});
