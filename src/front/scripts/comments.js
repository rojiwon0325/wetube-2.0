function getTime(_date) {
    const now = new Date();
    const date = new Date(_date);

    const year = now.getFullYear() - date.getFullYear();
    let month = now.getMonth() - date.getMonth();
    let day = now.getDate() - date.getDate();
    let hour = now.getHours() - date.getHours();
    let minute = now.getMinutes() - date.getMinutes();
    let second = now.getSeconds() - date.getSeconds();

    if (year > 2) {
        if (month > 0) {
            return year + " years ago";
        } else {
            return (year - 1) + " years ago";
        }
    } else if (year == 2) {
        if (month > 0) {
            return "2 years ago";
        } else {
            return "1 year ago";
        }
    } else if (year == 1) {
        if (month >= 0) {
            return "1 year ago";
        } else {
            month = month + 12;
        }
    }

    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (month > 2) {
        if (day > 0) {
            return month + " months ago";
        } else {
            return (month - 1) + " months ago";
        }
    } else if (month == 2) {
        if (day > 0) {
            return "2 months ago";
        } else {
            return "1 month ago";
        }
    } else if (month == 1) {
        if (day >= 0) {
            return "1 month ago";
        } else {
            day = day + last.getDate();
        }
    }

    if (day > 2) {
        if (hour > 0) {
            return day + " days ago";
        } else {
            return (day - 1) + " days ago";
        }
    } else if (day == 2) {
        if (hour > 0) {
            return "2 days ago";
        } else {
            return "1 day ago";
        }
    } else if (day == 1) {
        if (hour >= 0) {
            return "1 day ago";
        } else {
            hour = hour + 24;
        }
    }

    if (hour > 2) {
        if (minute > 0) {
            return hour + " hours ago";
        } else {
            return (hour - 1) + " hours ago";
        }
    } else if (hour == 2) {
        if (minute > 0) {
            return "2 hours ago";
        } else {
            return "1 hour ago";
        }
    } else if (hour == 1) {
        if (minute >= 0) {
            return "1 hour ago";
        } else {
            minute = minute + 60;
        }
    }

    if (minute > 2) {
        if (second > 0) {
            return minute + " minutes ago";
        } else {
            return (minute - 1) + " minutes ago";
        }
    } else if (minute == 2) {
        if (second > 0) {
            return "2 minutes ago";
        } else {
            return "1 minute ago";
        }
    } else if (minute == 1) {
        if (second > 0) {
            return "1 minute ago";
        }
    }

    return "just ago";

}

function stylingComment(doc) {
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
function addCommentInput(comment) {
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

function makeNewComment(comment) {
    const date = getTime(comment.createdAt);
    const thread = document.createElement("div");
    thread.classList.add("watch_comments_thread");
    thread.innerHTML =
        `<div class="watch_comments_thread_inner">
            <a class="watch_comments_thread_avatar" href="/user/${comment.creator._id}">
                <img src="${comment.creator.avatar}" crossorigin>
            </a>
            <div class="watch_comments_main">
                <div class="watch_comments_main_header">
                    <a class="watch_comments_badge" href="/user/${comment.creator._id}">${comment.creator.name}</a>
                    <div class="watch_comments_createdAt">${date}</div>
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
            <div class="watch_comments_action-menu">
                    <button class="watch_comments_action_btn btn_delete">DEL</button>
            </div>
        </div>`;
    if (comment.rootModel == "Video") {
        const details = document.createElement("details");
        details.classList.add("watch_comments_replies");
        details.id = comment.rootModel == "Video" ? comment._id : comment.root;
        details.setAttribute("open", "");
        const summary = document.createElement("summary");
        summary.innerText = "see replies...";

        details.appendChild(summary);
        thread.appendChild(details);

        if (comment.replies && comment.replies.length > 0) {
            summary.style.display = "block";
            details.removeAttribute("open");
            summary.addEventListener("click", () => {
                if (details.getAttribute("open") == null) {
                    summary.innerText = "close replies...";
                    if (summary.nextElementSibling == null) {
                        getFetch(comment._id, "Comment", -1, details);
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
            let input = e.target.parentNode.parentNode.querySelector(".watch_comments_input");

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
    thread.querySelector(".btn_delete").addEventListener("click", (e) => {
        if (document.getElementById("header_login_input")) {
            return
        } else {
            fetch("/deleteComment", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: comment._id
                }),
            }).then(res => {
                const { result } = await res.json();
                console.log(result);
                thread.remove();
            }).catch(console.log);
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

export async function getFetch(id, root, end, parent) {
    if (end < -1 || end == 0) {
        return false;
    }
    const res = await fetch(`/comment?v=${id}&root=${root}&end=${end}`);
    const status = res.status;

    if (status != 200 && status != 304) {
        console.log(status);
        return false;
    }

    const data = await res.json();
    const { length, comments, begin } = data;

    if (begin == -1) {
        return false;
    }
    if (length) {
        document.querySelector(".watch_comments_meta").innerText = `${length} comments`;
    }
    if (end != -1) {
        parent.lastChild.remove();
    }
    comments.forEach(cmt => {
        const node = makeNewComment(cmt);
        parent.appendChild(node);
        stylingComment(node);
    });

    if (begin > 0) {
        const more = document.createElement("button");
        more.innerText = "more";
        more.classList.add("watch_comments_more");
        more.setAttribute("data-end", begin);

        more.addEventListener("click", () => {
            getFetch(id, root, begin, parent);
        });

        parent.appendChild(more);
    }
    return true;
}