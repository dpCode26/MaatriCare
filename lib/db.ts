import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  // Only skip if fully connected (readyState === 1)
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  const url = process.env.MONGO_URL;
  if (!url) {
    throw new Error("MONGODB_URL environment variable is not defined");
  }

  try {
    await mongoose.connect(url, {
      bufferCommands: false,     
      serverSelectionTimeoutMS: 5000,  
      socketTimeoutMS: 45000,         
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("Database connection failed", { cause: error });
  }
}