import mongoose from "mongoose";
import { config } from "./env";

export const connectDB = async () => {
    mongoose.connect(config.mongoUri as string)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
}