import express from "express";
import { getEditVideo, getUpload, postEditVideo, postUpload, videos } from "./controllers/videoController";
import { multerMiddleware } from "./middlewares";


const videoRouter = express.Router();

videoRouter.get("/", videos); // my video list
videoRouter.route("/upload").get(getUpload).post(multerMiddleware.single("video"), postUpload);
videoRouter.route("/:id/edit").get(getEditVideo).post(postEditVideo);

export default videoRouter;