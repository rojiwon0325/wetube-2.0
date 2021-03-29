
export const home = (req, res) => {
    res.render("home");
};

export const login = (req, res) => {
    res.render("Login");
};

export const result = (req, res) => {
    const {
        query: { search_query },
    } = req;
    res.render("result", { title: `${search_query} - ${res.locals.title}` });
}

export const watch = (req, res) => {
    res.render("watch", { title: `비디오 제목 - ${res.locals.title}` });
}