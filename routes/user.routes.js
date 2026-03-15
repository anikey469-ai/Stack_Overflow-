import { registerUser } from "../controllers/user.controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);

export { userRouter };