import express from "express";
import routes from "./routes";
import { home, login, result, watch } from "../controllers/globalController";
import channelRouter from "./channelRouter";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.login, login);
globalRouter.get(routes.result, result);
globalRouter.get(routes.watch, watch);

globalRouter.use(routes.channel(), channelRouter);

export default globalRouter;