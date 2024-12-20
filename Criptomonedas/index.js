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

async function consultarCriptomoneda() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    /* fetch(url)
        .then(respuesta => respuesta.json())
        // .then(resultado => console.log(resultado.Data))
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
 */
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const criptomonedas = await obtenerCriptomonedas(resultado.Data);
        selectCriptomonedas(criptomonedas);
    } catch (error) {
        console.log(error)
    }
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

    //Limpiar HTML
    // limpiarHTML();
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


async function consultarAPI() {
    const {moneda, criptomoneda} = objInfo;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpiner();

    /* fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacion(cotizacion.DISPLAY[criptomoneda][moneda]);
        }) */

    try {
        const respuesta = await fetch(url);
        // const resultado = await respuesta.json();
        const cotizacion = await respuesta.json();
        mostrarCotizacion(cotizacion.DISPLAY[criptomoneda][moneda]);
    } catch (error) {
        console.log(error)
    }
}

function mostrarCotizacion(cotizacion) {
    limpiarHTML()
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

    const precio = d.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const precioAlto = d.createElement('p');
    precioAlto.classList.add('precio_info');
    precioAlto.innerHTML = `El precio es mas alto del dia: <span>${HIGHDAY}</span>`;

    const precioBajo = d.createElement('p');
    precioBajo.classList.add('precio_info');
    precioBajo.innerHTML = `El precio mas bajo del dia: <span>${LOWDAY}</span>`;

    const variacionHoras = d.createElement('p');
    variacionHoras.classList.add('precio_info');
    variacionHoras.innerHTML = `Variacion del precio ultimas 24 hrs: <span>${CHANGEPCT24HOUR}%</span>`;

    const ultimaActualizacion = d.createElement('p');
    ultimaActualizacion.classList.add('precio_info');
    ultimaActualizacion.innerHTML = `Ultima actualizacion: <span>${LASTUPDATE}</span>`;
    
    infoResult.appendChild(precio);
    infoResult.appendChild(precioAlto);
    infoResult.appendChild(precioBajo);
    infoResult.appendChild(variacionHoras);
    infoResult.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
    while(infoResult.firstChild){
        infoResult.removeChild(infoResult.firstChild);
    }
}

function mostrarSpiner() {
    limpiarHTML();

    const spiner =  d.createElement('div');
    spiner.classList.add('sk-circle');

    spiner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `;

    infoResult.appendChild(spiner);

}