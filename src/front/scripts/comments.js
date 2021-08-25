export function stylingComment(doc) {
    const text = doc.querySelector(".watch_comments_main_text");
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
export function addCommentInput(comment) {
    const input = document.createElement("div");
    input.classList.add("watch_comments_input");
    input.setAttribute("data-root", comment.rootModel == "Comment" ? comment.root : comment._id);
    input.setAttribute("data-rootmodel", "Comment");
    input.innerHTML =
        `<div class="watch_comments_input_avatar">
            <img src="${document.querySelector(".watch_comments_input_avatar").querySelector("img").src}" crossorigin />
        </div>
        <div class="watch_comments_input_inner">
            <div class="watch_comments_input_creation-box">
                <div contenteditable="true" aria-label="Write Comment..." class="watch_comments_textarea"></div>
                <div class="focused_underline"></div>
            </div>
            <div class="watch_comments_input_btns">
                <button class="watch_btn watch_comments_cancel">cancel</button>
                <button class="watch_btn watch_comments_comment">comment</button>
            </div>
        </div>`;
    handleComment(input);
    return input;
}

export function makeNewComment(comment) {
    const thread = document.createElement("div");
    thread.classList.add("watch_comments_thread");
    thread.setAttribute("data-date", comment.createdAt);
    thread.innerHTML =
        `<div class="watch_comments_thread_inner">
            <a class="watch_comments_thread_avatar" href="/user/${comment.creator._id}">
                <img src="${comment.creator.avatar}" crossorigin>
            </a>
            <div class="watch_comments_main">
                <div class="watch_comments_main_header">
                    <a class="watch_comments_badge" href="/user/${comment.creator._id}">${comment.creator.name}</a>
                </div>
                <div class="watch_comments_main_text">
                    <div class="watch_comments_main_text_content">${comment.text}</div>
                </div>
                <div class="watch_comments_main_text_btns">
                    <button class="watch_comments_main_text_btn">more</button>
                </div>
                <div class="watch_comments_main_btns">
                    <button class="watch_comments_main_btn btn_reply">reply</button>
                </div>
            </div>
            <div class="watch_comments_action-menu"></div>
        </div>`;
    if (comment.rootModel == "Video") {
        const details = document.createElement("details");
        details.classList.add("watch_comments_replies");
        details.id = comment.rootModel == "Video" ? comment._id : comment.root;
        const summary = document.createElement("summary");
        summary.innerText = "see replies...";

        details.appendChild(summary);
        thread.appendChild(details);

        if (comment.replies && comment.replies.length > 0) {
            summary.style.display = "block";
            summary.addEventListener("click", () => {
                if (details.getAttribute("open") == null) {
                    summary.innerText = "close replies...";
                    if (summary.nextElementSibling == null) {

                        fetch(`/comment?v=${comment._id}&date=${Date.now()}&root=Comment`)
                            .then(res => res.json())
                            .then(({ length, comments, more }) => {
                                document.querySelector(".watch_comments_meta").innerText = `${length} comments`;

                                comments.forEach(cmt => {
                                    const node = makeNewComment(cmt);
                                    details.insertBefore(node, summary.nextElementSibling);
                                    stylingComment(node);
                                });

                                if (more) {
                                    console.log(more);
                                } else {
                                    console.log(more);
                                }
                            }).catch(err => { console.log(err) });


                    }
                } else {
                    summary.innerText = "see replies...";
                }
            });
        }
    }
    thread.querySelector(".btn_reply").addEventListener("click", (e) => {
        if (document.getElementById("header_login_input")) {
            document.getElementById("header_login_input").click();
        } else {
            let input = thread.querySelector(".watch_comments_input");
            if (input) {
                input.style.display = "flex";
                input.querySelector(".watch_comments_textarea").focus();
            } else {
                input = addCommentInput(comment);
                thread.querySelector(".watch_comments_main").appendChild(input);
                input.style.display = "flex";
                input.querySelector(".watch_comments_textarea").focus();
            }
        }
    });
    return thread;
}

export function handleComment(node) {
    const textarea = node.querySelector(".watch_comments_textarea");
    node.querySelector(".focused_underline").style.opacity = 1;

    node.querySelector(".watch_comments_cancel").addEventListener("click", () => {
        textarea.innerText = "";
        if (node.dataset.rootmodel == "Comment") {
            node.style.display = "none";
        }
    });

    let root = node.dataset.root;
    let rootModel = node.dataset.rootmodel;

    node.querySelector(".watch_comments_comment").addEventListener("click", async () => {
        if (textarea.innerText == "") { return }
        const response = await fetch("/comment", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: textarea.innerText,
                root,
                rootModel
            }),
        });
        const data = await response.json();
        const { length, comment, creator } = data;
        comment.creator = creator;
        const cmt = makeNewComment(comment);

        if (rootModel == "Video") {
            document.querySelector(".watch_comments_meta").innerText = `${length} comments`;
            const parent = document.querySelector(".watch_comments_contents");
            parent.insertBefore(cmt, parent.firstChild);
        } else if (rootModel == "Comment") {
            const parent = document.getElementById(root);
            parent.insertBefore(cmt, parent.querySelector("summary").nextElementSibling);
        }
        stylingComment(cmt);
        textarea.innerText = "";
        if (node.dataset.rootmodel == "Comment") {
            node.style.display = "none";
        }
    });

};

// 댓글 추가로 불러오기 기능