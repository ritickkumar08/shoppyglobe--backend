import express from 'express'
import {addToCart, updateCart, deleteCartItem} from '../Controllers/cart.controller.js'
import authMiddleware from '../Middlewares/authMiddleware.js'


const cartRouter = express.Router()

cartRouter.post('/', authMiddleware, addToCart)
cartRouter.put('/:id', authMiddleware, updateCart)
cartRouter.delete('/:id', authMiddleware, deleteCartItem)

export default cartRouter