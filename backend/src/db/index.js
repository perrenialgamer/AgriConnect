import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
//async becasue DB is in another continent
const connectDB = async () => {
    try {
        const ConnectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Mongodb connected,DB HOST: ${ConnectionInstance.connection.host},DB NAME: ${ConnectionInstance.connection.name}`);
        
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;