import { getFetch, handleComment } from "./comments";

const watch_primary_inner = document.querySelector(".watch_primary_inner");
const watch_secondary_inner = document.querySelector(".watch_secondary_inner");

const watch_related = document.getElementById("watch_related");

const watch_main_comment = document.getElementById("watch_main_comment");

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

//comment

if (watch_main_comment) {

    if (document.getElementById("header_login_input")) {
        watch_main_comment.addEventListener("click", () => { document.getElementById("header_login_input").click(); });
    } else {
        handleComment(watch_main_comment);
    }
}

getFetch(document.getElementById("player_container").dataset.id, "Video", -1, document.querySelector(".watch_comments_contents"));
