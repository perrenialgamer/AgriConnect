import gpt from '../controllers/askgpt.controller.js'
import { Router } from "express";


const router = Router();

router.route("/ask").post(gpt);

export default router;
