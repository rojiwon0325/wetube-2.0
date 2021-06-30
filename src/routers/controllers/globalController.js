import Video from "../../models/Video";
import User from "../../models/User"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        return res.render("home", { videos });
    } catch (error) {
        return res.render("404");
    }

}

export const getLogin = (req, res) => {
    req.session.login = true;
    req.session.user = "123";
    res.render("login", { pageTitle: "Login |" });
}

export const postLogin = async (req, res) => {
    const { login, email, password, passport_github, passport_google } = req.body;
    if (login) {
        req.session.login = true;
        req.session.user = await User.find({ email, password })._id;

    } else if (passport_github) {
        // pass
    } else if (passport_google) {
        // pass
    }
    res.send();
}

export const logout = async (req, res) => {
    req.session.login = false;
    req.session.user = null;
    res.redirect(req.session.originalUrl);
}

export const results = async (req, res) => {
    const search_query = req.query.search_query.trim().replace(/ +/g, " ");
    let videos = [];
    if (search_query) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(search_query, "i"),
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
        const video = await Video.findById(id);
        if (video) {
            return res.render("watch", { pageTitle: video ? `${video.title} |` : "", video });
        }
    } else if (id) {
        return res.redirect(`/watch?v=${id}`)
    }
    return res.render("404");
}
