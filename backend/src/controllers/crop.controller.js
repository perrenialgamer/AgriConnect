
import { CityCrop } from '../models/CitycropPrice.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const updateCropPrice = asyncHandler(async(req,res)=>{
  const {city,state}=req.user;
  const {cropName,price}=req.body;
  const sameCrop=await CityCrop.findOneAndUpdate(
    {city,state,cropName}, //what to match
    {price},
    { new:true,upsert: true} //upsert adds doucument if not found
  )
  return res.status(200).json(new ApiResponse(200,'Successfully updated the crop price', sameCrop))
})

const getCropPrices=asyncHandler(async (req, res) => {
  const {city,state}=req.user;
  if(!city || !state){
    throw new ApiError(400,'Please provide all the required fields')
  }
  const cropPrice=await CityCrop.find({ city: city, state: state })
  if(!cropPrice){cropPrice={}}
  return res.status(200).json(new ApiResponse(200,'Successfully fetched the crop prices', cropPrice))
})


export {updateCropPrice,getCropPrices};