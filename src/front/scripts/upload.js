const upload_file_input = document.getElementById("upload_file_input");
const upload_img_input = document.getElementById("upload_img_input");
const upload_file_cancel = document.getElementById("upload_file_cancel");
const upload_img_cancel = document.getElementById("upload_img_cancel");

upload_file_input.addEventListener("change", () => {
    document.getElementById("preview_video").setAttribute("controls", true);
    document.getElementById("preview_video").src = URL.createObjectURL(upload_file_input.files[0]);
});

upload_img_input.addEventListener("input", () => {
    document.getElementById("preview_img").style.opacity = 1;
    document.getElementById("preview_img").src = URL.createObjectURL(upload_img_input.files[0]);
});

upload_file_cancel.addEventListener("click", () => {
    upload_file_input.value = null;
    document.getElementById("preview_video").setAttribute("controls", false);
    document.getElementById("preview_video").src = "#";
});
upload_img_cancel.addEventListener("click", () => {
    upload_img_input.value = null;
    document.getElementById("preview_img").style.opacity = 0;
    document.getElementById("preview_img").src = "#";
});