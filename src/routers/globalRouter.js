import express from "express";
import { getComment, comment, googleLoginCallback, home, results, view, watch } from "./controllers/globalController";
import videoRouter from "./videoRouter";
import userRouter from "./userRouter";
import { localMiddleware, privateMiddleware } from "./middlewares";


const globalRouter = express.Router();

globalRouter.use("/uploads", express.static("uploads"));
globalRouter.use("/static", express.static("static"));

globalRouter.get("/google-auth/callback", googleLoginCallback);
globalRouter.use(localMiddleware);

globalRouter.get("/", home);
globalRouter.get("/results", results);
globalRouter.get("/watch", watch);
globalRouter.get("/comment", getComment);

globalRouter.use("/user", userRouter);

globalRouter.use(privateMiddleware);
globalRouter.use("/video", videoRouter);

globalRouter.post("/comment", comment);
globalRouter.post("/view", view);

export default globalRouter;