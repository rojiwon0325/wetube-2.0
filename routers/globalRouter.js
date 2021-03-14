import express from "express";
import userRouter from "./userRouter";
import videoRouter from "./videoRouter";
import routes from "./routes";
import { home, join, login } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);

globalRouter.use(routes.users, userRouter);
globalRouter.use(routes.videos, videoRouter);

export default globalRouter;