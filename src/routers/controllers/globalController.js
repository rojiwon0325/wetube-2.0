

export const home = (req, res) => {
    res.render("home");
}

export const login = (req, res) => {
    res.render("login");
}


export const results = (req, res) => {
    res.render("search");
}


export const watch = (req, res) => {
    console.log(req.query);
    res.render("watch");
}
