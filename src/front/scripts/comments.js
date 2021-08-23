const watch_comments = document.querySelector(".watch_comments_contents");

export function handleLoadComment(doc) {
    const text = doc.querySelector(".watch_comments_main_text");
    console.log(text.clientHeight);
    if (text.clientHeight > 80) {
        text.setAttribute("collapsed", "");
        const btns = doc.querySelector(".watch_comments_main_text_btns");
        btns.style.display = "block";
        const btn = btns.querySelector(".watch_comments_main_text_btn");
        btn.addEventListener("click", (e) => {
            if (text.getAttribute("collapsed") != null) {
                text.style.display = "block";
                text.removeAttribute("collapsed");
                e.target.innerText = "less";
            } else {
                text.style.display = "-webkit-box";
                text.setAttribute("collapsed", "");
                e.target.innerText = "more";
            }
        });
    };
    text.style.display = "-webkit-box";
}

export function makeNewComment(comment) {
    const thread = document.createElement("div");
    thread.classList.add("watch_comments_thread");
    thread.setAttribute("data-id", comment._id);
    thread.innerHTML =
        `<div class="watch_comments_thread_inner">
            <a class="watch_comments_thread_avatar" href="/user/${comment.creator._id}">
                <img src=${comment.creator.avatar} crossorigin>
            </a>
            <div class="watch_comments_main">
                <div class="watch_comments_main_header">
                    <a class="watch_comments_badge" href="/user/${comment.creator._id}">${comment.creator.name}</a>
                </div>
                <div class="watch_comments_main_text">
                    <div class="watch_comments_main_text_content">${comment.text}
                    </div>
                </div>
                <div class="watch_comments_main_text_btns">
                    <button class="watch_comments_main_text_btn">more</button>
                </div>
                <div class="watch_comments_main_btn"></div>
            </div>
            <div class="watch_comments_action-menu"></div>
        </div>
        <div class="watch_comments_thread_replies"></div>`;
    watch_comments.appendChild(thread);
    handleLoadComment(thread);
}