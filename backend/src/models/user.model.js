import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true   // if you want to search by username
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
 
    },
    password:{
        type:String,
        required:[true,"Password is required"], //error message
    },
    gender:{
        type:String,
        enum:["M","F","O"]
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    
    role:{
        type:String,
        enum:["Farmer","Vendor"],
        required:true
    },
    refreshToken:{
        type:String,
        
    }
    
        
},{timestamps:true})

userSchema.pre("save",async function(next){//password in string down
    if(!this.isModified("password")){  //password change nahi hua hai toh next function call karo
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
        next();
    })

userSchema.methods.isPasswordCorrect=async function(password){
        return await bcrypt.compare(password,this.password);
    }
//jwt is bearer token admin ke pass hoti hai chabhi

userSchema.methods.generateAccessToken=function(){//it is fast doesn't need async
    return jwt.sign({//payload(data)
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName,
    },//Access token
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}            
);
}

userSchema.methods.generateRefreshToken=function(){//it is fast doesn't need async
    return jwt.sign({//payload(data)
        _id:this._id,
    },//Refresh token
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}            
);
}



export const User=mongoose.model("User",userSchema);