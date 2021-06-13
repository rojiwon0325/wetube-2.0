import express from "express";
import { featured, playlist, videos } from "../controllers/channelController";
import { getUpload, postEditVideo, postUpload } from "../controllers/videoController";
import routes from "./routes";

const channelRouter = express.Router();

channelRouter.get("/", featured);
channelRouter.get(routes.featured, featured);
channelRouter.get(routes.playlist, playlist);

// video Router
channelRouter.get(routes.videos, videos);
channelRouter.get(routes.upload, getUpload); // 업로드 및 영상 수정이 가능한 페이지

channelRouter.post(routes.upload, postUpload);
channelRouter.post(routes.editVideo(), postEditVideo);

export default channelRouter;