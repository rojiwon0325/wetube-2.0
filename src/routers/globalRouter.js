import express from "express";
import { home, login, results, watch } from "./controllers/globalController";
import studioRouter from "./studioRouter";
import userRouter from "./userRouter";


const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/login", login);
globalRouter.get("/results", results);
globalRouter.get("/watch", watch);

globalRouter.use("/user", userRouter);
globalRouter.use("/studio", studioRouter);

export default globalRouter;