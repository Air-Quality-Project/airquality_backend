import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (err) {
    logger.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
