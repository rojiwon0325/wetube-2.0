import Video from "../../models/Video"

export const videos = (req, res) => {
    res.send("videos");
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video |" });
};
export const postUpload = async (req, res) => {
    const { title, description } = req.body;
    try {
        await Video.create({
            title,
            description: description || "",
            createdAt: Date.now()
        });
    } catch (error) {
        console.log(error);

    }
    return res.redirect("/");// --> go to video
};
export const getEditVideo = (req, res) => {
    res.render("editVideo", { pageTitle: "Edit Video |" });
};
export const postEditVideo = (req, res) => {
    res.send("");
};