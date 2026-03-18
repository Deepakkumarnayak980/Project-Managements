import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { healthCheck } from "./controller/helthcheck.controller.js";
import { router } from "./routes/auth.router.js";

export const app = express();

// ✅ CORS FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// routes
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send("Server running");
});