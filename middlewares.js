import routes from "./routers/routes"

export const localMiddleware = (req, res, next) => {
    res.locals.title = "WeTube";
    res.locals.routes = routes;
    next();
}