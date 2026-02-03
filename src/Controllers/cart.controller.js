import Cart from '../Models/cart.model.js';
import Product from '../Models/products.model.js'

// add to cart logic
export const addToCart = async(req,res) =>{
    try{
        // we will get the id and quantity from the request body as we have defined the cart model
        const {productId, quantity} = req.body;
        const userId = req.user.id

        if(!productId || !quantity){
            return res.status(400).json({message : 'invalid product'})
        }

        const product = await Product.findById(productId) //checking if the product collection has the product

        if(!product){
            return res.status(404).json({message : `product doesn't exists`})
        }
        if(product.instock < quantity){
            return res.status(404).json({message : 'insufficient stocks'})
        }

        //now it can happen that the user has already added the product before hand checking for that
        const IteminCart = await Cart.findById({userId, productId})

        if(IteminCart){
            IteminCart.quantity += quantity
            await IteminCart.save()
        }else{
            IteminCart = await Cart.create({ //if not add the item to the cart by making a new cart object.
                userId,
                productId,
                quantity
            })
        }

        res.status(200).json({ IteminCart, message :'added to cart'})
    }catch(err){
        res.status(500).json({message: 'failed to add the product'})
    }
}

// update cart controller
export const updateCart = async (req, res) => {
    try{
        const productId = req.params.id
        const {quantity} = req.body
        const userId = req.user.id

        //to check if the product has some quantity to be processed further.
        if(!quantity){
            return res.status(400).json({message : 'invalid product'})
        }

        //finding the cart item and updating it 
        const IteminCart = await Cart.findOneAndUpdate(
            {userId, productId}, //as we need matching bot the product and the user
            {quantity},
            {new: true} //
        )

        //and if the product is not in the cart then 
        if(!IteminCart){
            return res.status(400).json({message :'item not in cart'})
        }
        
        //sending a successfully updated message.
        res.status(200).json({ IteminCart, message :'updated successfully'})
    }catch(err){
        res.status(500).json({message: 'failed to update the product'})
    }
}

//delete an item in cart
export const deleteCartItem = async (req, res) => {
    try{
        // extracting the product ID from the URL parameters for cart item identification
        const productId = req.params.id;
        const userId = req.user.id;

        const IteminCart = await Cart.findOneAndDelete({
            userId,
            productId
        })

        if(!IteminCart){
            return res.status(400).json({message :'item not in cart'})
        }

        // Check if the cart item was successfully found and deleted
        return res.status(200).json({IteminCart, message: 'deleted successfully'})
    }catch(err){
        res.status(500).json({message: 'failed to delete the product'})
    }
}