
const d = document;
const contenedor = d.getElementById("container");
const contenedorAlert = d.getElementById("container_2");
const formulario = d.querySelector("#formulario");

window.addEventListener("load", ()=>{
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    const ciudad = d.querySelector("#ciudad").value;
    const pais = d.querySelector("#pais").value;

    // console.log(pais);
    if(ciudad === "" || pais === ""){
        imprimirAlerta("Todos los campos son requeridos");
        return;
    }

    consultarAPI(ciudad, pais);
}

function imprimirAlerta(mensaje){
    const alerta = d.querySelector(".bg-red-100");
    //Valida si existe la clase, si no la hay se agrega la alerta
    if(!alerta){
        const divAlerta = d.createElement("div");
        divAlerta.classList.add("bg-red-100", "border", "border-red-500", "text-red-700", "rounded", "py-3", "px-4", "mt-5", "text-center");
        // console.log("Todos los campos son requeridos")
        divAlerta.innerHTML = `
            <strong class="font-bold">Error</strong>
            <span class="block">${mensaje}</span>
    
        `;
        //Se agrega la alerta al contenedor padre
        contenedorAlert.appendChild(divAlerta);

        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }

}

function consultarAPI(ciudad, pais) {
    const api_key = "6e72da485ac0d01848cf8fb0b07def4a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${api_key}`;

    //Hacer consulta
    // console.log(url);
    spiner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML() //Limpiar HTML previo
            if(datos.cod === "404"){
                imprimirAlerta("Ciudad no encontrada");
                return;
            }
            console.log(datos)
            //Imprimir datos en el HTML
            mostrarDatos(datos);
        })
}

function mostrarDatos(datos){
    const {name, main:{temp, temp_max, temp_min}} = datos;
    // const centrigrados = (temp - 273.15).toFixed(2);
    const centigrados = formatoGrados(temp);
    const max = formatoGrados(temp_max);
    const min = formatoGrados(temp_min);

    const nombreCiudad = d.createElement("p");
    nombreCiudad.classList.add("text-2xl", "mb-2")
    nombreCiudad.textContent = `Clima en ${name}`;
    // console.log(temp);
    const actual = d.createElement("p");
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMax = d.createElement("p");
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add("text-xl");

    const tempMin = d.createElement("p");
    tempMin.innerHTML = `Min: ${min} &#8451`;
    tempMin.classList.add("text-xl");

    const resultadoDiv = d.createElement("div");
    resultadoDiv.classList.add("text-center", "text-gray-700", "mb-5");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    
    contenedor.appendChild(resultadoDiv)
    // d.querySelector("#cont_2").insertBefore(resultadoDiv, formulario);
}

function limpiarHTML(){
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

function formatoGrados(grados){
    return parseInt(grados - 273.15);
}

//Spiner
function spiner(){
    limpiarHTML();
    const divSpiner = d.createElement("div");
    divSpiner.classList.add("sk-chase", "place-content-center", "flex", "items-center", "justify-center", "w-full");
    divSpiner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `;
    contenedor.appendChild(divSpiner);
}