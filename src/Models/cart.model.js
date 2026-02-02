import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // reference to the User document using ObjectId for establishing relationship
            required : true,
            immutable: true,
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product', // reference to the Product document using ObjectId for establishing relationship
            required: true,
            immutable: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1, //by default it will be 1 the user can increase it.
            min: 1 //to ensure we have atleast one in our cart.
        },
    },
    { timestamps: true }
)
// Create and export the Cart model to collection based on the defined schema
export default mongoose.model('cart', cartSchema)