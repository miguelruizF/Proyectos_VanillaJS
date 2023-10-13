const d = document;
const formulario = d.querySelector("#formulario");
const username = d.querySelector("#username");
const email = d.querySelector("#email");
const password = d.querySelector("#password");
const confirm_pass = d.querySelector("#confirm_pass");

d.addEventListener("DOMContentLoaded", ()=>{
    formulario.addEventListener("submit", (e)=>{
        e.preventDefault();
        checkEmail(email);
    });
});

//Check email is valid
function checkEmail(email) {
    const expression_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(expression_email.test(email.value.trim())){
        alert("El email es correcto")
    }else{
        alert("El email no es correcto");
    }
}
