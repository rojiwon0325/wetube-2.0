import express from "express";
import { googleLoginCallback, home, results, watch } from "./controllers/globalController";
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

globalRouter.use("/user", userRouter);

globalRouter.use(privateMiddleware);
globalRouter.use("/video", videoRouter);

export default globalRouter;