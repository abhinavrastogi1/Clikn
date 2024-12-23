import {
  deleteOriginalLink,
  generateShortLink,
  getOriginalLink,
  getuserLinks,
} from "../Controllers/urlController.js";
import  { Router } from "express";
import verifyJwt from "../MiddleWares/verifyJwtMiddleWare.js";

const linKRouter = Router();

linKRouter.get("/:shortId", getOriginalLink);
linKRouter.post("/user/url/generateShortLink", verifyJwt, generateShortLink);
linKRouter.get("/user/url/deleteLink", verifyJwt, deleteOriginalLink);
linKRouter.get("/user/url/getuserLinks", verifyJwt, getuserLinks);
export default linKRouter;
