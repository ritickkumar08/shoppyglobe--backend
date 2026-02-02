import mongoose from "mongoose";

const dbconnet = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m75zulj.mongodb.net/`);
        console.log("MongoDB connected successfully");
    }catch (err){
        console.error(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
}

export default dbconnet;