import { Router } from "express";
import verifyJwt from "../MiddleWares/verifyJwtMiddleWare.js";
import { getDateAnalytics } from "../Controllers/analyticsController.js";

const analyticsRouter=Router()
analyticsRouter.get("/analytics",verifyJwt,getDateAnalytics )

export default analyticsRouter