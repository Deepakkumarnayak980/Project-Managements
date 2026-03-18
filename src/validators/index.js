import { body, param } from "express-validator";

// Register
export const userRegisterValidator = () => [
  body("email").trim().notEmpty().isEmail(),
  body("username").trim().notEmpty().isLength({ min: 3 }).isLowercase(),
  body("password").trim().notEmpty().isLength({ min: 6 }),
  body("fullName").optional().trim(),
];

// Login
export const userLoginValidator = () => [
  body("email").trim().notEmpty().isEmail(),
  body("password").notEmpty(),
];

// Change Password
export const userChangeCurrentPasswordValidator = () => [
  body("oldPassword").notEmpty(),
  body("newPassword").notEmpty().isLength({ min: 6 }),
];

// Forgot Password
export const userForgotPasswordValidator = () => [
  body("email").trim().notEmpty().isEmail(),
];

// Reset Password
export const userResetForgotPasswordValidator = () => [
  param("resetToken").notEmpty().withMessage("Reset token is required"),
  body("newPassword").notEmpty().isLength({ min: 6 }),
];