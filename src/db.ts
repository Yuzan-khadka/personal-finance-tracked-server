import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("FATAL ERROR: The MONGO_URI environment variable is not set.");
    // Exit the process, as the application cannot function without a database connection.
    process.exit(1); 
}

const mongoURI: string = uri;

mongoose.connect(mongoURI).then(() => console.log("Connected tp MONGODB!!"))
.catch((err) => console.log("Failed to connect to MONGODB", err.message));

const connectDB = async() => {

    try {
         await mongoose.connect(mongoURI);
      
        console.log("MongoDB Connected sucessfully !!");
    } catch (err: unknown) {
        let errorMessage = "An unknown error occurred during MongoDB connection.";

        if (err instanceof Error) {
            // If it's an actual Error object, use its message
            errorMessage = err.message;
        }

        console.error('MongoDB connection error:', errorMessage);
        // It's often good practice to exit the process on a DB connection failure
        process.exit(1); 
    }

}


export default connectDB;