import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", { videos });
    } catch (error) {
        console.log(error);
        res.render("home", { videos: [] });
    }
};

export const login = (req, res) => {
    res.render("Login");
};

export const result = async (req, res) => {
    const {
        query: { search_query },
    } = req;
    let videos = [];
    try {
        videos = await Video.find({ title: { $regex: `/\b${search_query}\b/`, $options: "i" } });
    } catch (error) {
        console.log(error);
    }
    res.render("result", { title: `${search_query} - ${res.locals.title}`, videos, value: search_query });
}

export const watch = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("watch", { title: `${video.title} - ${res.locals.title}`, video });
    } catch (error) {
        console.log(error);
        res.render("404");
    }
}