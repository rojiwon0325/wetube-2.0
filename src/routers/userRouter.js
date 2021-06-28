import express from "express";


const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})",);

export default userRouter;