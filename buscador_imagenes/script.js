const API_KEY = '43053384-8229fd9d4427256f1c5697ebd';
const d = document;
const resultado = d.querySelector("#resultado");
const paginacion = d.querySelector("#paginacion");
const formulario = d.querySelector("#formulario");

window.onload = () => {
    formulario.addEventListener("submit", validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault();
    // alert("Diste clic")
    const terminoBusqueda = document.querySelector("#text_busqueda").value;
    if(terminoBusqueda === ""){
        mostrarAlerta("Debes ingresar un termino");
        return;
    }

    buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje){
    const alerta = d.createElement("p");
    const existeAlerta = d.querySelector(".bg-red-100");

    if(!existeAlerta){
        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center");
        alerta.innerHTML = `
        <strong class='font-bold'>Error!</strong>
        <span class='block sm:inline'>${mensaje}</span>
        `;
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }

    
}

function buscarImagenes(termino) {
    const key = API_KEY;
    const url =`https://pixabay.com/api/?key=${ key }&q=${termino}&per_page=100`;

    //console.log(url); //Debug parra revisar si funciona la API

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits);
        })
}

function mostrarImagenes(imagenes) {
    // console.log(imagenes)
    //remueve el hijo si es que existe
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    imagenes.forEach(imagen => {
        //console.log(imagen)
        const {previewURL, likes, views, largeImageURL} = imagen; 
        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-2 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">
                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Veces vistas</span></p>

                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                    </div>
                </div>
            </div>
        `
    });
}