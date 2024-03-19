const d = document;
const header = d.querySelector("header");

window.addEventListener("scroll", ()=>{
    header.classList.toggle("sticky", window.scrollY > 140);
})