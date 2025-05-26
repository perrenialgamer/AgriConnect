import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken" 
import { User } from "../models/user.model.js";

export const verifyJWT=asyncHandler(async(req,resizeBy,next)=>{
     try {
        //due to cookie parser ab request ke pass cokkie ka access hai
        const token=req.cookies?.accessToken || req.header("Authorization")
        ?.replace("Bearer ","")
   
        if (!token){
           throw new ApiError("Unauthorized request",401)
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
   
        if (!user)
           throw new ApiError("Invalid Acess",401) 
   
        req.user=user;
        next()
     } catch (error) {
        throw new ApiError(error?.message|| "invalid access token",401)
     }

}) 