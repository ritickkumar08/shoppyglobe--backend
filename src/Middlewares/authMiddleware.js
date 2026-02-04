import jwt from 'jsonwebtoken'

//auth middleware function it is to check for the authorized individual
//it takes three arguments req, res and next
const authMiddleware = (req, res, next) =>{
    //we read the authorization header from the incoming http request
    const authHeader = req.headers.authorization

    // If there is no Authorization header OR
    // if it does not start with "JWT "
    // then the client is not authenticated
    if(!authHeader || !authHeader.startsWith('JWT')){
        // 401 = Unauthorized
        return res.status(401).json({message: 'token not provided'})
    }

    // Split the header by space: "JWT <token>"
    // index 0 = "JWT"
    // index 1 = the actual JWT
    const token = authHeader.split(" ")[1]

    try{
        // Verify the token using the secret key
        // This does THREE things internally:
        // 1. Checks token signature 
        // 2. Checks token expiration
        // 3. Decodes the payload
        const decoded = jwt.verfiy(token, process.env.JWT_SECRET)

        // Attach useful data from the token to the request object
        // This makes the user data available to ALL protected routes
        // Example: req.user.id inside controllers
        req.user = {
            id: decoded.id,       // user ID stored when token was created
            role: decoded.email,  
        };

        //pass the control to the next middleware
        next();
    }catch(err){
        return res.status(401).json({ message: "token is Invalid or Expired" });
    }
}

export default authMiddleware;