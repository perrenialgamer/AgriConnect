import { Router } from "express";
import {registerUser,loginUser, logoutUser,refreshAccessToken,
    changeCurrentPassword,getCurrentUser,updateAccountDetails,
  
  
} from "../controllers/user.controller.js";
import errorHandler from "../middlewares/error.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";
const upload = multer();
const router = Router();

router.route("/register").post(upload.none(),registerUser)
//localhost:5000/api/v1/users/register version 1

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser) 
//inject middleware before using logoutuser

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword) 
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/updatedetails").patch(verifyJWT, updateAccountDetails) 
//patch used for partial updation while post se puura upddate hota





export default router;