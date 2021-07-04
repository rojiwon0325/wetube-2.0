import express from "express";
import { getEditProfile, me, postEditProfile, profile } from "./controllers/userController";
import { multerMiddleware, privateMiddleware } from "./middlewares";


const userRouter = express.Router();

userRouter.get("/:id", profile);
userRouter.use(privateMiddleware);
userRouter.get("/", me);
userRouter.route("/:id([0-9a-f]{24})/edit").get(getEditProfile).post(multerMiddleware.single("avatar"), postEditProfile);

export default userRouter;