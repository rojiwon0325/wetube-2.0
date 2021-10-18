import Video from "../../models/Video";
import User from "../../models/User";

export const videos = async (req, res) => {
    try {
        if (req.session.user) {
            const videos = (await User.findById(req.session.user._id).populate("videos")).videos;
            return res.render("videos", { pageTitle: "MY VIDEOS |", videos });
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
        if (file_video.length == 0) {
            return res.redirect("/video/upload");
        }
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
    const video = await Video.findById(id).populate("meta.creator");
    if (video) {
        if (video.meta.creator._id == req.session.user._id) {
            return res.render("editVideo", { pageTitle: "Edit Video |", video });
        } else {
            return res.redirect(`/watch?v=${id}`);
        }
    }
    return res.status(404).redirect("/");
};

export const postEditVideo = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const { file } = req;
    const video = await Video.findById(id).populate("meta.creator");
    if (video) {
        if (video.meta.creator._id != req.session.user._id) {
            return res.status(403).redirect(`/watch?v=${id}`);
        }
        if (req.body.delete) {
            await Video.findByIdAndDelete(id);
        } else {
            await Video.findById(id, (err, video) => {
                if (err) {
                    return
                }
                video.meta.description = description;
                video.title = title;
                if (file) {
                    video.thumbnail = file.location;
                }
                video.save();
            });
        }
    }
    return res.redirect("/video");
};