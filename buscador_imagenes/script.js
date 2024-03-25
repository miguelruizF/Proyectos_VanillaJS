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