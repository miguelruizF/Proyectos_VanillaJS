const d = document;
const header = d.querySelector("header");

window.addEventListener("scroll", ()=>{
    header.classList.toggle("sticky", window.scrollY > 140);
})

let menu = d.querySelector("#menu-icon");
let nav = d.querySelector(".nav");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    nav.classList.toggle("open");
}

window.onscroll = () => {
    menu.classList.remove("bx-x");
    nav.classList.remove("open");
}