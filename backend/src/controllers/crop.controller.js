
import { CityCrop } from '../models/CitycropPrice.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

const updateCropPrice = asyncHandler(async(req,res)=>{
  const {city,state}=req.user;
  const updatedBy=req.user._id;
  const {cropName,price}=req.body;
    const sameCrop = await CityCrop.findOneAndUpdate(
    { city, state, cropName, updatedBy }, // filter
    { $set: { price } },                  // update using $set
    { 
      new: true, 
      upsert: true, 
      setDefaultsOnInsert: true,  // applies default schema values for new doc
      runValidators: true         // ensure validations run on update
    }
  );
  return res.status(200).json(new ApiResponse(200,'Successfully updated the crop price', sameCrop))
})

const getCropPrices=asyncHandler(async (req, res) => {
  const {username} = req.params;
  const {city,state}=req.user;
  if(!city || !state){
    throw new ApiError(400,'Please provide all the required fields')
  }
  const user=await User.findOne({ username })
  
  const cropPrice=await CityCrop.find({ city, state,updatedBy:user._id })
  if(!cropPrice){cropPrice={}}
  return res.status(200).json(new ApiResponse(200,'Successfully fetched the crop prices', cropPrice))
})

const getAllVendors=asyncHandler(async (req,res)=>{
  const allVendor = await User.find({role:'Vendor'});
  return res.status(200).json(new ApiResponse(200,'Successfully fetched the vendors',allVendor))
})

const getStats = asyncHandler(async (req, res) => {
  const {cropName} = req.params;
  const {state, city} = req.user;
  
  // Find vendors in this city/state
  const vendors = await User.find({ role: 'Vendor', city, state });
  
  // Find crop price documents for the given crop in this city/state
  const samecrop = await CityCrop.find({ cropName, city, state });
  
  // Create a result array: for each vendor, include their fullName and price (or 0 if not found)
  const result = vendors.map(vendor => {
    // Look for a crop price document where the updatedBy matches vendor._id
    const cropDoc = samecrop.find(doc => doc.updatedBy.toString() === vendor._id.toString());
    return {
      username: vendor.username,
      price: cropDoc ? cropDoc.price : 0
    };
  });
  
  res.status(200).json(new ApiResponse(200, 'Success', result));
});


export {updateCropPrice,getCropPrices,getAllVendors,getStats};