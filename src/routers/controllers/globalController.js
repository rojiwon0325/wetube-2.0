import { google } from "googleapis";
import Video from "../../models/Video";
import User from "../../models/User"


export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
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
        }).sort({ createdAt: "desc" });
    }
    res.locals.search_query = search_query;
    return res.render("search", { pageTitle: `${search_query} |`, videos });
}


export const watch = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.query.v.match(reg)
    if (req.query.v == id) {
        const video = await Video.findById(id).populate("creator");
        if (video) {
            return res.render("watch", { pageTitle: video ? `${video.title} |` : "", video });
        }
    } else if (id) {
        return res.redirect(`/watch?v=${id}`)
    }
    return res.render("404");
}
