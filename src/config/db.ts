import mongoose from "mongoose";
import { config } from "./config";

const conncetDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Error in connecting to database", error);
    });

    await mongoose.connect(config.mongo_url as string);
  } catch (error) {
    console.error("Failed to connect with database", error);
    process.exit(1);
  }
};

export default conncetDB;
