const watch_primary_inner = document.querySelector(".watch_primary_inner");
const watch_secondary_inner = document.querySelector(".watch_secondary_inner");

const watch_related = document.getElementById("watch_related");

const watch_creation_box = document.querySelectorAll(".watch_comments_input_creation-box");

function handleLoadComment() {
    const text = document.querySelector(".watch_comments_main_text");
    if (text.clientHeight > 80) {
        text.setAttribute("collapsed", "");
        const btns = text.parentElement.querySelector(".watch_comments_main_text_btns");
        btns.style.display = "block";
        const btn = btns.querySelector(".watch_comments_main_text_btn");
        btn.addEventListener("click", (e) => {

            const comment = e.target.parentElement.previousSibling;
            if (comment.getAttribute("collapsed") != null) {
                comment.style.display = "block";
                comment.removeAttribute("collapsed");
                e.target.innerText = "less";
            } else {
                comment.style.display = "-webkit-box";
                comment.setAttribute("collapsed", "");
                e.target.innerText = "more";
            }
        });
    };
    text.style.display = "-webkit-box";
}
function handleLoadDescription() {
    const view = document.querySelector(".watch_description_view");
    if (view.clientHeight > 60) {
        view.setAttribute("collapsed", "");
        const btns = view.parentElement.querySelector(".watch_description_btns");
        btns.style.display = "block";
        const btn = btns.querySelector(".watch_description_btn");
        btn.addEventListener("click", (e) => {
            const content = e.target.parentElement.previousSibling;
            if (content.getAttribute("collapsed") != null) {
                content.style.display = "block";
                content.removeAttribute("collapsed");
                e.target.innerText = "less";
            } else {
                content.style.display = "-webkit-box";
                content.setAttribute("collapsed", "");
                e.target.innerText = "more";
            }
        });
    };
    view.style.display = "-webkit-box";
}


handleLoadDescription();
handleLoadComment();

if (watch_primary_inner) {
    if (window.matchMedia("(max-width: 1016px)").matches) {
        watch_primary_inner.insertBefore(watch_related, document.querySelector(".watch_comments"));
    } else {
        watch_secondary_inner.insertBefore(watch_related, null);
    }
    window.addEventListener("resize", () => {
        if (window.matchMedia("(max-width: 1016px)").matches) {
            watch_primary_inner.insertBefore(watch_related, document.querySelector(".watch_comments"));
        } else {
            watch_secondary_inner.insertBefore(watch_related, null);
        }
    });
}

watch_creation_box.forEach((node) => {
    node.addEventListener("click", () => {
        const logout = document.getElementById("header_login_input");
        if (logout) {
            logout.click();
        } else {
            document.querySelectorAll(".focused_underline").forEach((elem) => { elem.style.opacity = 1; });
        }
    });
});
