import mongoose from "mongoose";

export const DBConnect = async () => {
  try {
    const mongodb = await mongoose.connect(process.env.MONGODB_URI)  
    console.log(`MongoDB connected: ${mongodb.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};
