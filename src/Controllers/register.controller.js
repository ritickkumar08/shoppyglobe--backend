import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

// Controller responsible for user registration, Creates a new user after validating input and hashing password
const registerController = async (req, res) => {
    try{
        //getting the user-provided data from the request body.
        const {email, name, password} = req.body

        //checking if all the informantion required are actually sent by the user and if not return immediately.
        if(!email || !name || !password){
            return res.status(400).json({message: 'all fields (email, name, password) are required to be a user.'})
        }

        //validating the email structure
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        //if the given email doesn't follow the structure 
        if (!validEmail.test(email)) {
            return res.status(400).json({message: "Email format is not valid"});
        }

        // Regular expression enforcing strong password rules:
        // - at least 8 characters
        // - at least one lowercase letter
        // - at least one uppercase letter
        // - at least one number
        // - at least one special character
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

        // Reject weak passwords to reduce brute-force and credential stuffing risks
        if(!validPassword.test(password)){
            return res.status(400).json(
                {message: 'choose a strong passwor the password must have 8 characters, one upper and lower case letter, a number, and atleast one special character'}
            )
        }

        //check if the user already exists then they can't register.
        const existingUser = await User.findOne({email})

        //if user exists return immediately.
        if(existingUser){
            return res.status(400).json({message: 'user already exists'})
        }

        //hashing the password using bcrypt
        // 10 salt rounds is a reasonable balance between security and performance
        const hashedPassword = await bcrypt.hash(password, 10)

        //create a new user documnet in our database
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Send success response after successful registration
        // No sensitive data is returned
        res.status(201).json({ message: "User registered successfully. Please login to continue.",});
    }catch (error) {
        // Generic error message to avoid leaking internal details
        res.status(500).json({message: "Internal server error",});
  }
}

export default registerController;