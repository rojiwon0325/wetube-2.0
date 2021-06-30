/*
import multer from "multer";
import routes from "./routers/routes"

 export const multerVideo = multer({ dest: "videos/" });

export const localMiddleware = (req, res, next) => {
    res.locals.title = "WeTube";
    res.locals.routes = routes;
    next();
}

export const uploadVideo = multerVideo.single("filename");
*/

export const localMiddleware = (req, res, next) => {
    if (req.originalUrl != "/logout") {
        req.session.originalUrl = req.originalUrl;
    }
    res.locals.login = Boolean(req.session.login);
    next();
};