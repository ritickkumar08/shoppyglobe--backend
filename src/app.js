//Configure Express.
//middleware (json, cors)
// route mounting
// global error handler

import express from 'express'
import productRoutes from './Routes/product.route.js'
import cartRoutes from './Routes/cart.route.js'

const app = express()
app.use(express.json()) //a built-in middleware to convert the responses to json format to understand.

app.use('/products', productRoutes)
app.use('/cart',cartRoutes)

export default app