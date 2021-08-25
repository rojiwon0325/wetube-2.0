import { google } from "googleapis";
import Video from "../../models/Video";
import User from "../../models/User";
import Comment from "../../models/Comment";
import { async } from "regenerator-runtime";


export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("creator");
        return res.render("home", { videos });
    } catch (error) {
        const videos = [];
        return res.render("home", { videos });
    }
}

export const googleLoginCallback = async (req, res) => {
    const { code } = req.query;
    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL,
    );
    const oauth = google.oauth2({
        auth: oauth2Client,
        version: "v2"
    });
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    oauth.userinfo.get(async (err, _res) => {
        if (_res) {
            req.session.user = await User.findOne({ email: _res.data.email });
            if (!req.session.user) {
                req.session.user = await User.create({
                    email: _res.data.email,
                    name: _res.data.name,
                    avatar: _res.data.picture,
                    google_picture: _res.data.picture,
                    videos: []
                });
            } else {
                await User.findByIdAndUpdate(
                    req.session.user._id, {
                    google_picture: _res.data.picture
                });
            }
            req.session.user.videos = null;
            res.redirect(req.session.referer);
        } else if (err) {
            const url = oauth2Client.generateAuthUrl({
                access_type: "offline",
                scope: [
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "openid",]
            });
            res.redirect(url);
        }
    });
};

export const results = async (req, res) => {
    const search_query = req.query.search_query.trim().replace(/ +/g, " ");
    let videos = [];
    if (search_query) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`\\b${search_query.split(" ").join("|")}\\b`, "ig"),
            }
        }).sort({ createdAt: "desc" }).populate("creator");
    }
    res.locals.search_query = search_query;
    return res.render("search", { pageTitle: `${search_query} |`, videos });
}


export const watch = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.query.v.match(reg);
    if (req.query.v == id) {
        const video = await Video.findById(id).populate({ path: "meta.creator", model: "User" }).populate({ path: "meta.comments", model: "Comment", populate: "creator" });
        if (video) {
            const now = new Date();
            return res.render("watch", { pageTitle: video ? `${video.title} |` : "", video, now, comments: video.meta.comments });
        }
    } else if (id) {
        return res.redirect(`/watch?v=${id}`)
    }
    return res.render("404");
}

export const view = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.query.v.match(reg);
    if (req.query.v == id) {
        const video = await Video.findById(id);
        if (video) {
            video.meta.views += 1;
            await video.save();
            return res.status(200);
        }
    }
    return res.status(404);
};

export const comment = async (req, res) => {
    const { text, root, rootModel } = req.body;
    let v = null;
    const cmt = await Comment.create({
        text,
        creator: req.session.user._id,
        root,
        rootModel,
        createdAt: Date.now()
    });
    const user = await User.findById(req.session.user._id);
    if (rootModel == "Video") {
        v = await Video.findById(root);
        v.meta.comments.push({ $each: [cmt], $position: 0 });
        await v.save();
        v = await Video.findById(root).populate({ path: "meta.comments", model: "Comment", populate: "creator" });
        return res.send({ length: v.meta.comments.length, comment: cmt, creator: { _id: req.session.user._id, avatar: req.session.user.avatar, name: req.session.user.name } });

    } else if (rootModel == "Comment") {
        v = await Comment.findById(root);
        v.replies.push({ $each: [cmt], $position: 0 });
        await v.save();

        return res.send({ comment: cmt, creator: { _id: req.session.user._id, avatar: req.session.user.avatar, name: req.session.user.name } });

    } else {
        return res.send({ error: "error" });
    }
}

export const getComment = async (req, res) => {
    const { v, root, date } = req.query;
    if (root == "Video") {
        const video = await Video.findById(v).populate({ path: "meta.comments", model: "Comment", populate: "creator" });
        const idx = video.meta.comments.findIndex(c => c.createdAt < date);
        const comments = video.meta.comments.slice(idx, idx + 3);
        const more = Boolean(video.meta.comments[idx + 3]);

        return res.send({ length: video.meta.comments.length, comments, more });

    } else if (root == "Comment") {
        const comment = await Comment.findById(v).populate({ path: "replies", model: "Comment", populate: "creator" });
        const idx = comment.replies.findIndex(c => c.createdAt < date);
        const comments = comment.replies.slice(idx, idx + 3);
        const more = Boolean(comment.replies[idx + 3]);
        return res.send({ comments, more });
    }
};