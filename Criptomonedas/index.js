const d = document;
const formulario = d.querySelector("#formulario");
const criptomonedasSelect = d.querySelector("#criptomoneda");
const monedaSelect = d.querySelector("#moneda");
const infoResult = d.querySelector("#div_result");

const objInfo = {
    moneda: "",
    criptomoneda: ""
}

//Promise criptomonedas
const obtenerCriptomonedas = criptomonedas => new Promise((resolve) => {
    resolve(criptomonedas);
})

d.addEventListener("DOMContentLoaded", () => {
    consultarCriptomoneda();
    formulario.addEventListener("submit", submitFormulario);
    monedaSelect.addEventListener("change", leerValor);
    criptomonedasSelect.addEventListener("change", leerValor);
});

function consultarCriptomoneda() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        // .then(resultado => console.log(resultado.Data))
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        // console.log(cripto)
        const {FullName, Name} = cripto.CoinInfo;
        const option = d.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}

function leerValor(e) {
    objInfo[e.target.name] = e.target.value;
    console.log(objInfo);
}

function submitFormulario(e) {
    e.preventDefault();
    //Validacion
    const {moneda, criptomoneda} = objInfo;
    if(moneda === "" || criptomoneda === ""){
        mostrarAlerta("Ambos campos no deben de estar vacios");
        return; //Cortar ejecucion
    }

    //Consultar API
    consultarAPI();
}

function mostrarAlerta(msg) {

    const existeError = d.querySelector(".error");
    if(!existeError){

        const msgError = d.createElement('div');
        msgError.classList.add('error');
        msgError.textContent = msg;
        
        formulario.appendChild(msgError);
        
        setTimeout(() => {
            msgError.remove()
        }, 2000);
    }
}


function consultarAPI() {
    const {moneda, criptomoneda} = objInfo;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacion(cotizacion.DISPLAY[criptomoneda][moneda]);
        })
}

function mostrarCotizacion(cotizacion) {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

    const precio = d.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: ${PRICE}`;

    infoResult.appendChild(precio);
}