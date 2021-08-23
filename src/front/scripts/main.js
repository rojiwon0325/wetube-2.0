import "regenerator-runtime";
import "../styles/styles.scss"

const header = document.querySelector(".header");

function headerClick(e) {
    const tools = document.querySelector(".personalTools");
    const btn = header.querySelector(".header_avatar");
    if (btn) {
        if (btn == e.target && !tools.classList.contains("tools-active")) {
            tools.classList.add("tools-active");
        } else {
            tools.classList.remove("tools-active");
        }
    }
}

if (header) {
    document.addEventListener("click", headerClick);
}