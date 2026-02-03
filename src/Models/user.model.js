import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true, //the email must be unique.
        lowercase: true, // converting the email ids to lowercase for uniformity and unambiguity
        trim: true,
    },
    password:{
        type: String,
        required: true,
        select: false // preventing password from being included in query results by default for security
    }
    },
    {timestamps:true}
)