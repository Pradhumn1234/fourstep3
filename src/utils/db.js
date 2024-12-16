import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const uri = process.env.MONGODB_URI

    // Establish a connection to MongoDB
    await mongoose.connect(uri);

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // throw new Error("Failed to connect to MongoDB");
  }
};

export default dbConnect;
