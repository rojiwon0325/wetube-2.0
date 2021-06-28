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
export const getEditVideo = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.params.id.match(reg)
    if (req.params.id == id) {
        const video = await Video.findById(id);
        if (video) {
            return res.render("editVideo", { pageTitle: "Edit Video |", video });
        }
    } else if (id) {
        return res.redirect(`/video/${id}/edit`)
    }
    return res.render("404");
};
export const postEditVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (await Video.exists({ _id: id })) {
        if (req.body.delete) {
            await Video.findByIdAndDelete(id);
        }
        await Video.findByIdAndUpdate(id, {
            title, description
        });
    } else {
        return res.render("404")
    }
    return res.redirect(`/video`);
};