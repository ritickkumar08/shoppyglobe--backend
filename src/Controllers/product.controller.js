import Product from '../Models/products.model'

//get all the products
export const getAllProducts = async (req, res) => {
    try{
        //we have find method provided by mongoose itself which retrieves the whole collection
        //and returns a promise
        const products = await Product.find()

        res.status(200).json({
            items: products.length, //gives the number of items in the collection
            products,
        })
    }catch(err){
        res.status(500).json({message: 'unable to retrive the products data'})
    }
}

//get elemment by id 
export const getProductById = async (req, res) => {
    try{
        const productId = req.params.id

        const product = await Product.findById(productId)

        if(!product){
            return res.status(500).json({message: 'product not found'})
        }

        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message: "the product not found"})
    }
}