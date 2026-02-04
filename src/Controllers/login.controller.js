// Login controller handles user authentication

import User from "../Models/user.model.js";
// importing jsonwebtoken to generate JWT tokens after successful login
import jwt from 'jsonwebtoken'
// importing bcrypt to compare hashed passwords securely, it prevents from storing or comparing plain-text passwords
import bcrypt from "bcryptjs";


// It verifies credentials and issues a JWT if valid
const loginController = async (req,res) => {
    try{
        // Destructuring email and password from the request body, which has to be sent by the user
        const {email, password} = req.body;

        // Missing credentials = user error should be handled to avoid unnecessary DB calls
        if(!email || !password){
            return res.status(400).json({message: 'email and password are required.'})
        }

        //finding a user with given email
        //we are explicitly sending +password as, password is excluded in schema
        const user = await User.findOne({email}).select('+password')

        // If no user exists with this email, stop immediately as the user is not registered.
        if(!user){
            return res.status(404).json({message: `user doesn't exists`})
        }

        //compare the plain text password from the request with the hashed password stored in database
        const isValidPassword = await bcrypt.compare(password, user.password)

        //if the validation faile or return false.
        if(!isValidPassword){
            return res.status(401).json({message:'entered wrong password'})
        }

        //if the authentication is successfull we generate the JWT token
        const token = jwt.sign(
            { id: user._id },              // payload: identifies the user
            process.env.JWT_SECRET,        // secret used to sign and later verify token
            { expiresIn: "30m" }           // token automatically expires after 30 minutes
        )

        // Sending success response with token and safe user data
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    }catch (error) {
    // Generic server error response
    res.status(500).json({message: "Internal server error",});
  }
}

export default loginController;