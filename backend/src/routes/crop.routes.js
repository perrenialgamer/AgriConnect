import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateCropPrice,getCropPrices,getAllVendors,getStats } from "../controllers/crop.controller.js";

const router = Router();
router.route("/prices/:username").get(verifyJWT, getCropPrices)
router.route("/priceupdate").patch(verifyJWT, updateCropPrice)
router.route("/vendors") .get(verifyJWT, getAllVendors)
router.route("/stats/:cropName").get(verifyJWT, getStats)
export default router;

