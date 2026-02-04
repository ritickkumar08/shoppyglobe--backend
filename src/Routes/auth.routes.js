import express from 'express'
import registerController from '../Controllers/register.controller.js'
import loginController from '../Controllers/login.controller.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)

export default authRouter