import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


const generateAccessandRefreshTokens = async(userId)=>{
  try {
    const user=await User.findById(userId)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()  // Methods me parenthesis
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false}) //don't check for password while saving refresh token
    return {accessToken,refreshToken}

  } catch (error) {

    throw new ApiError("something went wrong whlie refresh and access token",500)
  }
}

const registerUser= asyncHandler(async (req, res) => {

  const {fullName,email,username,password,gender,state,city,role}=req.body
  
  
  if([fullName,email,username,password,gender,state,city,role].some((feild)=>feild?.trim() === "")){
    throw new ApiError("Please fill all the fields",400);
  } 

  const existedUser= await User.findOne({
    $or:[{username},{email}]}); //username: req.body.username iska shortcut hai
  if(existedUser){
    throw new ApiError("User already exists",400);
  }

  //Sirf ek hi chij hai database se baat krne ke liye : users
  const user= await User.create({
    fullName,
    email:email.toLowerCase(),
    username:username.toLowerCase(),
    password,
    gender,
    state,
    city,
    role
  })

  const createdUser= await User.findById(user._id).select("-password -refreshToken");
  //minus shows nahi chahiye 
  // isliye kiya hai kyuki hum nahi chahte ki password aur refresh token user ko mile  

  if(!createdUser){
    throw new ApiError("Something went wrong while registering",500);
  }

  return res.status(201).json(//new object for API response
    new ApiResponse(200,"User registered successfully",createdUser)
  )
});

const loginUser=asyncHandler(async (req,res)=>{
  
  const {username,password}=req.body
  if(!username){
    throw new ApiError("username or email is required",400);
  }

  const user= await User.findOne(
    {username:username.toLowerCase()}
  )

  //ye jo User hai uske method hai findone updateone mongoose ka
  //while user jo hmko mila hai uss object me hai ispassword correct etc
  if(!user){
    throw new ApiError("User not found",404);
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError("Invalid user credentials",401)
    }

  const {accessToken,refreshToken}=await generateAccessandRefreshTokens(user._id)
  const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
  const options={
    httpOnly:true,  //only by backend
    secure:true
  }

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(200,"Userlogged in Successfully",
      {
        user: loggedInUser,accessToken,refreshToken
      }
    )
  )
})

const logoutUser=asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
    req.user._id,  //kya find krna hai
    {
        $unset:{refreshToken:1 //removes the feild from doc

        }

    },
    {
      new:true    // new refresh token dena
    }
  )

  const options={
    httpOnly:true,  //only by backend
    secure:true
  }

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,"User logged out",{}))
   
})

const refreshAccessToken =asyncHandler(async(req,res)=>{
  const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken //second one for mobile
  if (!incomingRefreshToken ) {
    throw new ApiError("unauthorized request",401);
    
  }
  try {
    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
  
    if (!user ) {
      throw new ApiError("Invalid refresh token",401);
      
    }
    if(incomingRefreshToken!==user?.refreshToken){
      throw new ApiError("Refresh token expired or used",401);
    }
    const options={
      httpOnly:true,  //only by backend
      secure:true
    }
    const {accessToken,newRefreshToken}=await generateAccessandRefreshTokens(user._id)
  
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
      new ApiResponse(
        201,"Access token refreshed",{accessToken,refreshToken:newRefreshToken}
      )
    )
  } catch (error) {
    throw new ApiError(error?.message ||"Invalid refresh token",401)
  }


})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
const {oldPassword,newPassword}=req.body
const user=await User.findById(req.user?._id) //get this in req.user by verifyjwt middleware
const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
if(!isPasswordCorrect){
  throw new ApiError("Invalid Password",400)

}

user.password=newPassword
await user.save({validateBeforeSave:false})//userSchema.pre("save")
//ye wala hook call hoga from user model which will hash tha password
  return res.status(200)
  .json(new ApiResponse(200,"Password changed succefully",{}))
})

const getCurrentUser=asyncHandler(async(req,res)=>{
  return res.status(201)
  .json(new ApiResponse(200,"Current user fetched succefully"
    ,req.user))
})

const updateAccountDetails=asyncHandler(async(req,res)=>{
  const {email,fullName,state,city}=req.body
  const updateFields = {};
  if (email) updateFields.email = email;city
  if (fullName) updateFields.fullName = fullName;
  if (state) updateFields.state = state;
  if (city) updateFields.city = city;
  
  if (Object.keys(updateFields).length === 0) {
    throw new ApiError("At least one field (email, fullName, or location) is required", 400);
  }

  const user=await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updateFields},    //email:email
    {new:true} //updated info return hoti hai
  ).select("-password")

  return res.status(200) //ok response code 200 send to client side by frontend app in browser window tab bar etc...
  .json(new ApiResponse(200,"Account details updated succefully",user))

})





export {registerUser,loginUser,logoutUser,refreshAccessToken
  ,changeCurrentPassword,getCurrentUser,updateAccountDetails,
};
