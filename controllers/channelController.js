

export const featured = (req, res) => {
    res.render("featured", { title: `채널명 - ${res.locals.title}` });
}

export const upload = (req, res) => {
    res.render("upload", { title: `채널명 - ${res.locals.title}` });
};

export const videos = (req, res) => {
    res.render("videos", { title: `채널명 - ${res.locals.title}` });
}

export const playlist = (req, res) => {
    res.render("playlist", { title: `채널명 - ${res.locals.title}` });
}