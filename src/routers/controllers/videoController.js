import Video from "../../models/Video";
import User from "../../models/User";

export const videos = (req, res) => {
    return res.redirect("/");
    try {
        if (req.session.user) {
            const videos = User.findById(req.session.user._id).populate("videos").videos;
            return res.render("videos", { videos });
        }
        return res.redirect("/");
    } catch {
        return res.redirect("/");
    }
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video |" });
};
export const postUpload = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { video: file_video, thumbnail: file_thumbnail } = req.files;
        const newvideo = await Video.create({
            title,
            thumbnail: file_thumbnail[0].location,
            source: file_video[0].location,
            meta: {
                description: description || "",
                createdAt: Date.now(),
                creator: req.session.user._id,
            }
        });
        const user = await User.findById(req.session.user._id);
        user.videos.push(newvideo._id);
        await user.save();
    } catch (error) {
        console.log(error);
        return res.redirect("/video/upload");
    }
    return res.redirect("/video");
};
export const getEditVideo = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.params.id.match(reg)
    if (req.params.id == id) {
        const video = await Video.findById(id);
        if (video) {
            if (video.creator == req.session.user._id) {
                return res.render("editVideo", { pageTitle: "Edit Video |", video });
            } else {
                return res.status(403).redirect(`/watch?v=${id}`);
            }
        }
    } else if (id) {
        return res.redirect(`/video/${id}/edit`)
    }
    return res.status(404).redirect("/");
};
export const postEditVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const video = await Video.findById(id);
    if (video) {
        if (video.creator != req.session.user._id) {
            return res.status(403).redirect(`/watch?v=${id}`);
        }
        if (req.body.delete) {
            await Video.findByIdAndDelete(id);
        }
        await Video.findByIdAndUpdate(id, {
            title, description
        });
    }
    return res.status(404).redirect("/video");
};