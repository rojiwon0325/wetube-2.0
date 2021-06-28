import express from "express";
import { getEditVideo, getUpload, postEditVideo, postUpload, videos } from "./controllers/videoController";


const videoRouter = express.Router();

videoRouter.get("/", videos); // my video list
videoRouter.route("/upload").get(getUpload).post(postUpload); // upload new video
videoRouter.route("/:id/edit").get(getEditVideo).post(postEditVideo); // video edit and details

export default videoRouter;