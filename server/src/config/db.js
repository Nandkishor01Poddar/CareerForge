import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDB = async() => {
    try {
        await mongoose.connect(config.mongo_uri)
        console.log("MongoDB connected......")
    } catch (error) {
        console.log("MongoDB connection error: ", error)
        throw error
    }
}

export default connectToDB