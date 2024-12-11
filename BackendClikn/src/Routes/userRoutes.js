import express, { Router } from "express";
import { userLogin, userRegistration } from "../Controllers/userController.js";
const userRouter = Router();
userRouter.post("/registration",userRegistration);
userRouter.post("/login", userLogin);
export default userRouter;
