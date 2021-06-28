import { crossOriginResourcePolicy } from "helmet";
import Video from "../../models/Video";

const user = null;

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        return res.render("home", { user, videos });
    } catch (error) {
        return res.render("404");
    }

}

export const login = (req, res) => {
    res.render("login", { pageTitle: "Login |" });
}


export const results = async (req, res) => {
    // 공백만 있을때 어떻게 처리할 것인가
    const key = req.query.search_query.trim().replace(/ +/g, " ");
    console.log(key);
    const videos = await Video.find({
        title: {
            $regex: new RegExp(key, "i"),
        }
    }).sort({ createdAt: "desc" });
    res.render("search", { pageTitle: `${key} |`, key, videos });
}


export const watch = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.query.v.match(reg)
    if (req.query.v == id) {
        const video = await Video.findById(id);
        if (video) {
            return res.render("watch", { pageTitle: video ? `${video.title} |` : "", video });
        }
    } else if (id) {
        return res.redirect(`/watch?v=${id}`)
    }
    return res.render("404");
}
