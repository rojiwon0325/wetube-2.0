import express from "express";
import routes from "./routes";

const userRouter = express.Router();

userRouter.get("/", (req, res) => res.send("user")); // 사용하지 않음



userRouter.get(routes.profile, (req, res) => res.send("profile"));

export default userRouter;