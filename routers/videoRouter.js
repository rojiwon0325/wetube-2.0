import express from "express";
import { upload } from "../controllers/videoController";
import routes from "./routes";

const videoRouter = express.Router();

videoRouter.get("/", (req, res) => res.send("video"));
videoRouter.get(routes.upload, upload);

videoRouter.get(routes.videoDetail, (req, res) => res.send("video Detail"));

export default videoRouter;