
export const home = (req, res) => {
    res.render("home");
};

export const join = (req, res) => {
    res.send("Join");
};

export const login = (req, res) => {
    res.send("Login");
};

export const upload = (req, res) => {
    res.send("videoUpload");
};