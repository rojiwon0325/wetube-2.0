import express from "express";
import { getLogin, home, logout, postLogin, results, watch } from "./controllers/globalController";
import videoRouter from "./videoRouter";
import userRouter from "./userRouter";


const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/logout", logout);
globalRouter.get("/results", results);
globalRouter.get("/watch", watch);

globalRouter.use("/user", userRouter);
globalRouter.use("/video", videoRouter);

export default globalRouter;