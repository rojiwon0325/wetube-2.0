const channel_edit = document.querySelector(".channel_edit");

const EditClick = () => {
    const tools = document.querySelector(".edit_channel_tools");
    if (tools.classList.contains("tools-active")) {
        tools.classList.remove("tools-active");
    } else {
        tools.classList.add("tools-active");
    }
};

const EditCheck = (e) => {
    const avatar = document.getElementById("editChannel-form_avatar");
    const check = document.getElementById("editChannel-form_check");
    if (check.checked && e.target == check) {
        avatar.disabled = true;
        document.querySelector(".edit_channel_label.check").classList.remove("label_inactive");
        document.querySelector(".edit_channel_label.avatar").classList.add("label_inactive");
    } else {
        avatar.disabled = false;
        document.querySelector(".edit_channel_label.check").classList.add("label_inactive");
        document.querySelector(".edit_channel_label.avatar").classList.remove("label_inactive");
    }
};

if (channel_edit) {
    const editChannelCancel = document.getElementById("edit_channel_cancel");
    const editChannel_form_check = document.getElementById("editChannel-form_check");
    channel_edit.addEventListener("click", EditClick);
    editChannelCancel.addEventListener("click", EditClick);
    editChannelCancel.addEventListener("click", EditCheck);

    editChannel_form_check.addEventListener("click", EditCheck);
    editChannel_form_check.addEventListener("click", EditCheck);
}