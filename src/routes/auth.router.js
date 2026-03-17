import express from "express";
import { registerUser } from "../controller/auth.controller.js";
import { validate } from "../middlewares/validater.middleeare.js";
import { userRegisterValidator } from "../validators/index.js";


export const authRouter = express.Router();


authRouter.route("/register").post(userRegisterValidator(),validate,registerUser);