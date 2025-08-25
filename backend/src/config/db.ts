import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI as string)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
}