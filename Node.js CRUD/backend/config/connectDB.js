import mongoose from "mongoose";

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}

export default connectDB; 

