import { handleComment, makeNewComment, stylingComment } from "./comments";

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
    handleComment(watch_main_comment);
    watch_main_comment.querySelector(".focused_underline").style.opacity = 0;
    watch_main_comment.addEventListener("click", () => {
        if (document.getElementById("header_login_input")) {
            document.getElementById("header_login_input").click();
        } else {
            watch_main_comment.querySelector(".focused_underline").style.opacity = 1;
        }
    });
}

fetch(`/comment?v=${document.getElementById("player_container").dataset.id}&date=${Date.now()}&root=Video`)
    .then(res => res.json())
    .then(({ length, comments, more }) => {
        document.querySelector(".watch_comments_meta").innerText = `${length} comments`;

        comments.forEach(cmt => {
            const node = makeNewComment(cmt);
            document.querySelector(".watch_comments_contents").appendChild(node);
            stylingComment(node);
        });

        if (more) {
            console.log(more);
        } else {
            console.log(more);
        }
    }).catch(err => { console.log(err) });