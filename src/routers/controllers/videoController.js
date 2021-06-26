import Video from "../../models/Video"

export const videos = (req, res) => {
    res.send("videos");
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video |" });
};
export const postUpload = async (req, res) => {
    const { title, description } = req.body;
    const video = new Video({
        title,
        description: description || "",
        createdAt: Date.now()
    });
    console.log(video);
    return res.redirect("/");// --> go to video
};
export const getEditVideo = (req, res) => {
    res.render("editVideo", { pageTitle: "Edit Video |" });
};
export const postEditVideo = (req, res) => {
    res.send("");
};