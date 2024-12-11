import express, { Router } from "express";
import { userLogin, userRegistration } from "../Controllers/userController.js";
const userRouter = Router();
userRouter.get("/registration", userRegistration);
userRouter.get("/login", userLogin);
export default userRouter;
