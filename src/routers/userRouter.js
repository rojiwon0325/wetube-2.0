import express from "express";
import { me } from "./controllers/userController";


const userRouter = express.Router();

userRouter.get("/", me);
userRouter.get("/:id([0-9a-f]{24})",);

export default userRouter;