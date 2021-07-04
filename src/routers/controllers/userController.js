import User from "../../models/User";

export const me = async (req, res) => {
    res.redirect(`/user/${req.session.user._id}`);
};

export const profile = async (req, res) => {
    const reg = /([0-9a-f]{24})/g;
    const id = req.params.id.match(reg);
    if (req.params.id == id) {
        const user = await User.findById(id).populate("videos");
        if (user) {
            res.locals.me = req.session.user;
            return res.render("userProfile", { pageTitle: user ? `${user.name} |` : "", user });
        }
    } else if (id) {
        return res.redirect(`/user/${id}`);
    }
    return res.status(404).redirect("/");
};

export const getEditProfile = (req, res) => {
    const { id } = req.params;
    if (req.session.user._id != id) {
        return res.status(403).redirect(`/user/${id}`);
    }
    return res.render("editProfile", { pageTitle: "Edit Profile |", me: req.session.user });
};
export const postEditProfile = async (req, res) => {
    const { name, check } = req.body;
    const { id } = req.params;
    const { file } = req;
    let image = req.session.user.avatar;
    let newname = req.session.user.name;
    if (req.session.user._id != id) {
        return res.status(403).redirect(`/user/${id}`);
    }
    if (!check && file) {
        image = file.path;
    } else if (check) {
        image = req.session.user.google_picture;
    }
    if (name != "") {
        newname = name;
    }
    await User.findByIdAndUpdate(id, {
        name: newname,
        avatar: image,
    });
    req.session.user.name = newname;
    req.session.user.avatar = image;
    return res.redirect(`/user/${id}`);
};