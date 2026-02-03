import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
    },
    { _id: false }
)

const productSchema = new mongoose.Schema({
        Productname:{
            type: String,
            required: true,
            trim: true, // no whitespace from both ends is required of the product name string
            immutable: true
        },
        price:{
            type: Number, // store in smallest currency unit
            required: true,
            min: 0 //prices can't be on negative side.
        },
        description:{
            type: String,
            trim: true
        },
        instock:{
            type: Number,
            required: true,
            min: 0,
        },
        images:{
            type: [imagesSchema],
            default: [],
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model("Product", productSchema);