import express from "express";
import { me, postEditProfile, profile } from "./controllers/userController";
import { multerMW, privateMiddleware } from "./middlewares";


const userRouter = express.Router();

userRouter.get("/:id", profile);
userRouter.use(privateMiddleware);
userRouter.get("/", me);
userRouter.route("/edit").post(multerMW.single("avatar"), postEditProfile);

export default userRouter;