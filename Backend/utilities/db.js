import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log("Error in ConnectDB ", error.message);
    });
};

export default connectDB;
