import express from "express";
import cors from "cors";
import { healthCheck } from "./controller/helthcheck.controller.js";
import {  router } from "./routes/auth.router.js";
import cookieParser from "cookie-parser";


export const app = express();

// basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())


// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routers
app.use("/api/v1/healthcheck", healthCheck);
app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send("hello Deepak");
});