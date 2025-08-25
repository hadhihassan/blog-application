import mongoose from "mongoose";
import { config } from "./env";
import user from '../models/User'

export const connectDB = async () => {
    mongoose.connect(config.mongoUri as string)
        .then(async() => {
            console.log('MongoDB connected successfully')            
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
}