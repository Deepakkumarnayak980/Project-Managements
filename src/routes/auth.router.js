import express from "express";
import { registerUser } from "../controller/auth.controller.js";

export const authRouter = express.Router();

authRouter.route("/register").post(registerUser);