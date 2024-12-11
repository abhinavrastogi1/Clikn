import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js";
import { errorHandler } from "./MiddleWares/errorHandlerMiddleWare.js";
import linKRouter from "./Routes/urlRoutes.js";
export const app = express();

app.use(cors({ origin: process.env.CORS, credentials: true }));
app.use(express.json())
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use("/",linKRouter)
app.use("/user", userRouter);

app.use(errorHandler);
