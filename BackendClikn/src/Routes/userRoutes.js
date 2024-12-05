import express, { Router } from "express";
import { userRegistration } from "../Controllers/userController.js";

const userRouter = Router();
userRouter.get("/auth", userRegistration);

export default userRouter;
