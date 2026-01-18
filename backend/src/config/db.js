import mongoose from "mongoose"
import dotenv from "dotenv"

export  const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to the database")
    } catch (error) {
        console.error("Error connectiong to mongoDB",error);
        process.exit(1) // exit with failure
    }
}