import "../styles/styles.scss"

console.log("hi")

const body = document.getElementById("body");
const header = document.querySelector(".header");

function handlePosition(e) {
    if (body.getBoundingClientRect().top < 0) {
        header.classList.add("header_scroll");
    } else if (body.getBoundingClientRect().top == 0) {
        header.classList.remove("header_scroll");
    }
}

function handleCLickDOM(e) {
    const btn = document.querySelector(".header_avatar");
    const tools = document.querySelector(".personalTools");
    if (btn == document.activeElement && !tools.classList.contains("tools-active")) {
        tools.classList.add("tools-active");
    } else {
        tools.classList.remove("tools-active");
    }
}

if (header) {
    document.addEventListener("click", handleCLickDOM);
    document.addEventListener("scroll", handlePosition);
}