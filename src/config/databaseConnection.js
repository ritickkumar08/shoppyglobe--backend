import mongoose from "mongoose";

const Dbconnet = async () => {
    try{
        if(!process.env.MONGO_URI){
            throw new Error('MONGO_URI is not found') 
        }

        mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log(`mongodb connected`))
        .catch(() => console.log('connection failed'))
    }catch (err){
        console.error(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
}

export default Dbconnet;