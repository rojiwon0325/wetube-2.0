import { handleLoadComment, makeNewComment } from "./comments";

const watch_primary_inner = document.querySelector(".watch_primary_inner");
const watch_secondary_inner = document.querySelector(".watch_secondary_inner");

const watch_related = document.getElementById("watch_related");

const watch_creation_box = document.querySelectorAll(".watch_comments_input_creation-box");

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

watch_creation_box.forEach((node) => {
    const textarea = node.querySelector(".watch_comments_textarea");
    const logout = document.getElementById("header_login_input");
    node.addEventListener("click", () => {
        if (logout) {
            logout.click();
        } else {
            document.querySelectorAll(".focused_underline").forEach((elem) => { elem.style.opacity = 1; });
        }
    });
    if (!logout) {
        node.nextSibling.querySelector(".watch_comments_cancel").addEventListener("click", () => {
            textarea.innerText = "";
        });
        node.nextSibling.querySelector(".watch_comments_comment").addEventListener("click", () => {
            if (textarea.innerText == "") { return }
            fetch("/comment", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: textarea.innerText,
                    video: document.getElementById("player_container").dataset.id,
                    root: node.dataset.root
                }),
            })
                .then(res => res.json())
                .then(({ length, comment }) => {
                    document.querySelector(".watch_comments_meta").innerText = `${length} comments`;
                    console.log(comment);
                    makeNewComment(comment);

                })

            textarea.innerText = "";
        });
    }
});


document.querySelector(".watch_comments_contents").childNodes.forEach(node => handleLoadComment(node));