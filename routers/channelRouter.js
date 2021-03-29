import express from "express";
import { featured, playlist, upload, videos } from "../controllers/channelController";
import routes from "./routes";

const channelRouter = express.Router();

channelRouter.get("/", featured);
channelRouter.get("/featured", featured);
channelRouter.get(routes.videos(), videos);
channelRouter.get(routes.videos() + routes.upload, upload);
channelRouter.get(routes.playlist(), playlist);

export default channelRouter;