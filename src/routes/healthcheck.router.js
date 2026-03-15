import expess from "express";
import { healthCheck } from "../middlewares/helthcheck.controller";

export const router = expess.Router();

router.route("/").get(healthCheck);
