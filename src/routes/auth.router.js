import express from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controller/auth.controller.js";

import { validate } from "../middlewares/validater.middleeare.js";

import {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgotPasswordValidator,
} from "../validators/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

export const router = express.Router();

// Public Routes
router.post("/register", userRegisterValidator(), validate, registerUser);

router.post("/login", userLoginValidator(), validate, login);

router.get("/verify-email/:verificationToken", verifyEmail);

router.post("/refresh-token", refreshAccessToken);

router.post(
  "/forgot-password",
  userForgotPasswordValidator(),
  validate,
  forgotPasswordRequest
);

router.post(
  "/reset-password/:resetToken",
  userResetForgotPasswordValidator(),
  validate,
  resetForgotPassword
);

// Protected Routes
router.post("/logout", verifyJWT, logoutUser);

router.get("/current-user", verifyJWT, getCurrentUser);

router.post(
  "/change-password",
  verifyJWT,
  userChangeCurrentPasswordValidator(),
  validate,
  changeCurrentPassword
);

router.post(
  "/resend-email-verification",
  verifyJWT,
  resendEmailVerification
);