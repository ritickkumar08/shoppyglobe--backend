//Configure Express.
//middleware (json, cors)
// route mounting
// global error handler

import express from 'express'
import productRoutes from './Routes/product.route.js'
import cartRoutes from './Routes/cart.route.js'
import authRouter from './Routes/auth.routes.js'

const app = express()
app.use(express.json()) //a built-in middleware to convert the responses to json format to understand.

app.use('/products', productRoutes)
app.use('/cart',cartRoutes)
app.use('/',authRouter)

/* -------------------- Global Error Handler -------------------- */
//This middleware handles errors. that are not because of the users but something broke internally
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
})

export default app