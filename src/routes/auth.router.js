import express from "express";
import { login, logOutUser, registerUser } from "../controller/auth.controller.js";
import { validate } from "../middlewares/validater.middleeare.js";
import { userLoginValidator, userRegisterValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const router = express.Router();

router.route("/register").post( userRegisterValidator(),validate,registerUser);

router.route("/login").post(userLoginValidator(), validate,login);

router.route("/logout").post(verifyJWT, logOutUser);