const d = document;
const formulario = d.querySelector("#formulario");
const username = d.getElementById("username");
const email = d.querySelector("#email");
const password = d.querySelector("#password");
const confirm_pass = d.querySelector("#confirm_pass");
const modal = d.getElementById("popup-modal");
const text_modal = d.getElementById("text-h3");
const btn_cerrar = d.getElementById("btn_cerrar");
const pop_success = d.getElementById("pop_success");

d.addEventListener("DOMContentLoaded", ()=>{
    formulario.addEventListener("submit", (e)=>{
        e.preventDefault();
        
        if(!requiredFields([username, email, password, confirm_pass])){
            formulario.reset();
            
            pop_success.innerHTML = `<div id="popup-modal" tabindex="-1" class="absolute grid place-items-center z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-75">
                    <div class="p-6 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                        <h3 id="text-h3" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Registro exitoso</h3>
                    </div>
                </div>
            </div>
        </div>`;
        setTimeout(() => {
            pop_success.classList.add("hidden");
        }, 2000);
        // window.reload()
        }else{
            checkLength(username, 3, 15);
            checkLength(password, 6, 25);
            checkEmail(email);
            matchPass(password, confirm_pass);
        }
    });
});

//Check email is valid
function checkEmail(email) {
    const expression_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(expression_email.test(email.value.trim())){
        showSuccess(email)
    }else{
        showError(email);
        modal.classList.remove("hidden");
        text_modal.innerText = "El email no es correcto";
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 2000);
    }
}

//passwords Match
function matchPass(input1, input2) {
    if(input1.value != input2.value){
        showError(input2);
        modal.classList.remove("hidden");
        text_modal.innerText = "La contraseña no coincide";
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 2000);
    }
}

//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min){
        showError(input);
        // input,
        // `${getField(input)} debe tener mas de ${min} caracteres`);
        modal.classList.remove("hidden");
        text_modal.innerText = `El ${getField(input)} debe tener más de ${min} caracteres`;
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 2000);
    } else if (input.value.length > max) {
        showError(input);
        modal.classList.remove("hidden");
        text_modal.innerText = `El ${getField(input)} debe tener menos de ${max} caracteres`;
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 2000);
    } else {
        showSuccess(input);
    }
    // console.log(input.value.length)
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
            showError(input);
            modal.classList.remove("hidden");
            text_modal.innerText = `Algunos inputs estan vacios, necesitas llenarlos`;
            setTimeout(() => {
                modal.classList.add("hidden");
            }, 2000);
            isRequired = true;
        }else{
            showSuccess(input)
        }
    });
    return isRequired;
}

//Show input error message
function showError(input){
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