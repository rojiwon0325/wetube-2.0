import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const upload_file_input = document.getElementById("upload_file_input");
const upload_img_input = document.getElementById("upload_img_input");
const upload_file_cancel = document.getElementById("upload_file_cancel");
const upload_img_cancel = document.getElementById("upload_img_cancel");
const edit_img_input = document.getElementById("edit_img_input");
const edit_img_cancel = document.getElementById("edit_img_cancel");

if (upload_file_input) {
    upload_file_input.addEventListener("change", () => {
        const preview = document.getElementById("preview_video");
        preview.setAttribute("controls", true);

        if (preview.src == window.location + "#") {
            preview.src = URL.createObjectURL(upload_file_input.files[0]);
        } else {
            URL.revokeObjectURL(preview.src);
            preview.src = URL.createObjectURL(upload_file_input.files[0]);
        }
    });
}
if (upload_img_input) {
    upload_img_input.addEventListener("input", () => {
        const preview = document.getElementById("preview_img");
        preview.style.opacity = 1;

        if (preview.src == window.location + "#") {
            preview.src = URL.createObjectURL(upload_img_input.files[0]);
        } else {
            URL.revokeObjectURL(preview.src);
            preview.src = URL.createObjectURL(upload_img_input.files[0]);
        }
    });
}
if (edit_img_input) {
    edit_img_input.addEventListener("input", () => {
        const preview = document.getElementById("preview_img");
        if (preview.src != preview.dataset.src) {
            URL.revokeObjectURL(preview.src);
        }
        preview.src = URL.createObjectURL(edit_img_input.files[0]);
    });
}
if (edit_img_cancel) {
    edit_img_cancel.addEventListener("click", () => {
        const preview = document.getElementById("preview_img");
        edit_img_input.value = null;
        if (preview.src != preview.dataset.src) {
            URL.revokeObjectURL(preview.src);
            preview.src = preview.dataset.src;
        }
        edit_img_cancel.blur();
    });
}
if (upload_file_cancel) {
    upload_file_cancel.addEventListener("click", () => {
        const preview = document.getElementById("preview_video");
        upload_file_input.value = null;
        preview.removeAttribute("controls");
        if (preview.src != window.location + "#") {
            URL.revokeObjectURL(preview.src);
        }
        upload_file_cancel.blur();
    });
}
if (upload_img_cancel) {
    upload_img_cancel.addEventListener("click", () => {
        const preview = document.getElementById("preview_img");
        upload_img_input.value = null;
        preview.style.opacity = 0;
        if (preview.src != window.location + "#") {
            URL.revokeObjectURL(preview.src);
        }
        upload_img_cancel.blur();
    });
}
if (upload_file_input) {
    upload_file_input.oninvalid = (e) => {
        alert("Please Select a Video.");
    };
}
if (document.getElementById("upload-form")) {
    document.getElementById("upload-form").addEventListener("submit", (e) => {
        document.querySelector(".loading-screen").classList.remove("hidden");
        if (upload_img_input.files[0] == null) {
            e.preventDefault();
            makeThumbnail();
        }
    });
}

const makeThumbnail = async () => {
    const ffmpeg = createFFmpeg({ log: true, corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js" });
    await ffmpeg.load();
    const URL_FILE = document.getElementById("preview_video").src;
    ffmpeg.FS("writeFile", upload_file_input.files[0].name, await fetchFile(URL_FILE));
    await ffmpeg.run(
        "-i",
        upload_file_input.files[0].name,
        "-ss",
        "00:00:02",
        "-frames:v",
        "1",
        `${upload_file_input.files[0].name}_thumb.jpg`
    );

    const thumb = new Blob([ffmpeg.FS("readFile", `${upload_file_input.files[0].name}_thumb.jpg`).buffer], { type: "image/jpg" });
    const fd = new FormData();
    fd.append("video", upload_file_input.files[0]);
    fd.append("title", document.querySelector(".upload_title_input").value);
    fd.append("description", document.querySelector(".upload_description_input").value);
    fd.append("thumbnail", thumb);
    fetch("/video/upload", { method: "POST", body: fd })
        .then(res => {
            ffmpeg.FS("unlink", upload_file_input.files[0].name);
            ffmpeg.FS("unlink", `${upload_file_input.files[0].name}_thumb.jpg`);

            URL.revokeObjectURL(URL_FILE);
            window.location = res.url;
        });
};
