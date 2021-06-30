export const me = async (req, res) => {
    res.redirect(`/user/${req.session.user}`);
}