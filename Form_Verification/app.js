
const d = document;
const formulario = d.querySelector("#formulario");
const username = d.getElementById("username");
const email = d.querySelector("#email");
const password = d.querySelector("#password");
const confirm_pass = d.querySelector("#confirm_pass");

d.addEventListener("DOMContentLoaded", ()=>{
    formulario.addEventListener("submit", (e)=>{
        e.preventDefault();

        if(requiredFields([username, email, password, confirm_pass])){
            // getUser(username);
            matchPass(password, confirm_pass);
            checkLength(username, 3, 15);
            checkEmail(email);
        }
    });
});

//Check email is valid
function checkEmail(email) {
    const expression_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(expression_email.test(email.value.trim())){
        console.log("El email es correcto")
    }else{
        console.log("El email no es correcto");
    }
}

//passwords Match
function matchPass(input1, input2) {
    if(input1.value != input2.value){
        console.log(`${input2} La contraseña no coincide`);
    }else{
        console.log("Las contraseñas coinciden")
    }
}

//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        console.log(
        input,
        `${getField(input)} debe tener mas de ${min} caracteres`
    );
    } else if (input.value.length > max) {
        console.log(
        input,
        `${getField(input)} debe tener menos de ${max} caracteres`
    );
    } else {
        console.log(input);
    }
}

//Get username
function getField(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check required fields
function requiredFields(inputArray) {
    let isRequired = false;
    inputArray.forEach(input => {
        if(input.value.trim() === ""){
            showError(input,`${getField(input)} is required`);
            isRequired = true;
        }else{
            showSuccess(input)
        }
    });
    return isRequired;
}

//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    // const small = formControl.querySelector('small');
    // small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}