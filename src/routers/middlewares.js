import { google } from "googleapis";
import multer from "multer";

export const localMiddleware = (req, res, next) => {
    const { login, logout } = req.body;
    if (login) {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URL,
        );
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "openid",]
        });
        req.session.referer = req.originalUrl;
        res.redirect(url);
    } else if (logout) {
        req.session.user = null;
        res.redirect(req.originalUrl);
    } else {
        res.locals.login = Boolean(req.session.user);
        if (Boolean(req.session.referer) && Boolean(req.session.user) != true) {
            req.session.destroy((err) => {
                console.log(err);
            });
        }
        res.locals.avatar = req.session.user.avatar;
        next();
    }
};

export const privateMiddleware = (req, res, next) => {
    if (res.locals.login) {
        next();
    } else {
        res.status(403).redirect(req.headers.referer || "/");
    }
};

export const multerMiddleware = multer({ dest: "uploads/" });