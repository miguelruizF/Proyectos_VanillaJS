
const d = document;
const contenedor = d.getElementById("container");
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
        contenedor.appendChild(divAlerta);

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
    const {main:{temp, temp_max, temp_min}} = datos;
    const centrigrados = (temp - 273.15).toFixed(2);
    // console.log(temp);
    const actual = d.createElement("p");
    actual.innerHTML = `${centrigrados} &#8451`;
    actual.classList.add("font-bold", "text-6xl");

    const resultadoDiv = d.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white", "mb-5");
    resultadoDiv.appendChild(actual);
    
    contenedor.appendChild(resultadoDiv)
    // d.querySelector("#cont_2").insertBefore(resultadoDiv, formulario);
}

function limpiarHTML(){
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}