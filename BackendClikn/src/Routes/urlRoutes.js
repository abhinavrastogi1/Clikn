import {
  deleteOriginalLink,
  generateShortLink,
  getOriginalLink,
  getuserLinks,
} from "../Controllers/urlController.js";
import { Router } from "express";
import verifyJwt from "../MiddleWares/verifyJwtMiddleWare.js";

const linKRouter = Router();

linKRouter.get("/:shortId", getOriginalLink);
linKRouter.post("/url/generateShortLink", verifyJwt, generateShortLink);
linKRouter.delete("/url/deleteLink", verifyJwt, deleteOriginalLink);
linKRouter.get("/url/getuserLinks", verifyJwt, getuserLinks);
export default linKRouter;
