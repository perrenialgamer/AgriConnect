import mongoose from 'mongoose'

const citycropSchema = new mongoose.Schema({
    state:{
        type:String,
        required:true
    },
    
    city:{
        type:String,
        required:true
    },
    cropName:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    updatedAt:{
        type: Date,
        default:Date.now()
    },
    updatedBy:
     { type: mongoose.Types.ObjectId,
        ref: "User" }
}, { timestamps: true})

citycropSchema.index({ city: 1, cropName: 1,updatedBy:1 }, { unique: true });

export const CityCrop=mongoose.model("CityCrop",citycropSchema)