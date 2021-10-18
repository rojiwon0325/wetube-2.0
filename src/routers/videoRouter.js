import express from "express";
import { getEditVideo, getUpload, postEditVideo, postUpload, videos } from "./controllers/videoController";
import { multerMW } from "./middlewares";



const videoRouter = express.Router();

videoRouter.get("/", videos); // my video list
videoRouter.route("/upload").get(getUpload).post(multerMW.fields([{ name: "video" }, { name: "thumbnail" }]), postUpload);
videoRouter.route("/:id/edit").get(getEditVideo).post(multerMW.single("thumbnail"), postEditVideo);

export default videoRouter;