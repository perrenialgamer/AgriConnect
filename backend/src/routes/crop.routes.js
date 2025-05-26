import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateCropPrice,getCropPrices } from "../controllers/crop.controller.js";

const router = Router();
router.route("/prices").get(verifyJWT, getCropPrices)
router.route("/priceupdate").patch(verifyJWT, updateCropPrice)
export default router;

