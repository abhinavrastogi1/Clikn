import express, { Router } from "express";
import { userLogin, userRegistration, verifyUser } from "../Controllers/userController.js";
import verifyJwt from "../MiddleWares/verifyJwtMiddleWare.js"
const userRouter = Router();
userRouter.post("/registration",userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/userVerification", verifyJwt,verifyUser);
export default userRouter;
