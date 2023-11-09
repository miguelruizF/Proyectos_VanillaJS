const api_key = "38b55c6abe71b6a0c233342f33ff9c6a";
const d = document;
const contenedor = d.querySelector("#container");
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