import Video from "../../models/Video";

const user = null;

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { user, videos });
    } catch (error) {
        return res.render("404");
    }

}

export const login = (req, res) => {
    res.render("login", { pageTitle: "Login |" });
}


export const results = async (req, res) => {
    const key = req.query.search_query;
    res.render("search", { pageTitle: `${key} |` });
}


export const watch = async (req, res) => {
    const { v } = req.query;
    const video = await Video.findById(v);
    res.render("watch", { pageTitle: video ? `${video.title} |` : "", video });
}
