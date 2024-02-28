var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//Variaveis que serão utilizadas
var form = document.querySelector("#search-form > form");
var input = document.querySelector("#input-localizacao");
var sectionTempoInfo = document.querySelector("#tempo-info");
var sectionWeather = document.querySelector("#weather-details");
//-------------------------------------------------
//EVENTO: submit do botao pesquisar, com função de callback sendo assincrona
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var localizacao, resposta, dados, infos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault(); //Pra impedir a pagina de recarregar quando submit
                if (!input || !sectionTempoInfo)
                    return [2 /*return*/]; //se nao achar nenhum input, ou a section, sairá do evento
                localizacao = input.value;
                //se a localizacao for muito pequena, sair do evento
                if (localizacao.length < 3) {
                    alert("O local precisa ter, pelo menos, 3 letras.");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4 /*yield*/, fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(localizacao, "&appid=58c9d3fd3239bb6aa4e5f120e2e4f31c&lang=pt_br&units=metric"))];
            case 2:
                resposta = _a.sent();
                return [4 /*yield*/, resposta.json()];
            case 3:
                dados = _a.sent();
                infos = {
                    temperatura: Math.round(dados.main.temp),
                    local: dados.name,
                    icone: "https://openweathermap.org/img/wn/".concat(dados.weather[0].icon, "@2x.png"),
                    descricao: dados.weather[0].description.toUpperCase(),
                };
                console.log(dados);
                console.log(infos.descricao);
                //-------------------------------------------------
                //Aqui eu defino o conteudo HTML que vai ficar dentro da minha section, que tbm é um conteudo HTML
                sectionTempoInfo.innerHTML = "\n    <div class=\"tempo-data\">\n    <h2>".concat(infos.local, "</h2>\n    \n    <span>").concat(infos.temperatura, "\u00B0C</span>\n    </div>\n\n    <img src=\"").concat(infos.icone, "\">      \n    ");
                return [3 /*break*/, 6];
            case 4:
                error_1 = _a.sent();
                //se a requisicao der error, exibir o erro
                console.log("Deu erro na obten\u00E7ao da API. Erro:".concat(error_1));
                return [3 /*break*/, 6];
            case 5:
                console.log("Finished");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
