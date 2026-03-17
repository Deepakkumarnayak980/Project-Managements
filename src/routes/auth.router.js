import express from "express";
import { login, registerUser } from "../controller/auth.controller.js";
import { validate } from "../middlewares/validater.middleeare.js";
import { userLoginValidator, userRegisterValidator } from "../validators/index.js";


export const router = express.Router();


router.route("/register").post(userRegisterValidator(),validate,registerUser);
router.route('/login').post(userLoginValidator(),validate,login)