let user = {
    username: "jiwon"
}
user = null;
const videos = [
    {
        title: "video title",
        rating: 2,
        comments: 3,
        createdAt: "2 minutes ago",
        views: 59,
        id: 1
    },
    {
        title: "video title2",
        rating: 3,
        comments: 4,
        createdAt: "3 minutes ago",
        views: 9,
        id: 2
    }
];

export const home = (req, res) => {
    res.render("home", { user, videos });
}

export const login = (req, res) => {
    res.render("login", { pageTitle: "Login |" });
}


export const results = (req, res) => {
    console.log(req.query);
    res.render("search", { pageTitle: "results |" });
}


export const watch = (req, res) => {
    const { v } = req.query;
    const video = videos.find(elem => elem.id === parseInt(v, 10));
    res.render("watch", { pageTitle: video ? `${video.title} |` : "", video });
}
