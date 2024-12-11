import {
  generateShortLink,
  getOriginalLink,
} from "../Controllers/urlController.js";
import express, { Router } from "express";
import verifyJwt from "../MiddleWares/verifyJwtMiddleWare.js";

const linKRouter = Router();

linKRouter.get("/:shortId", getOriginalLink);
linKRouter.post("/url/generateShortLink", verifyJwt, generateShortLink);
export default linKRouter;
