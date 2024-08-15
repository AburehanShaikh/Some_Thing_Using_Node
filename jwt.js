const jwt = require("jsonwebtoken")
const jwtAuthMiddleware=(req,res,next)=>{

const authorization= req.headers.authorization;
if(!authorization) return res.status(401).json({error:"Invalid Token"})
const token = req.headers.authorization.split(" ")[1];

if(!token) return res.status(401).json({error: "Unauthorized"})
    try{
        //Verify the JWT Token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //Attach User information to the request object
        req.user =decoded;
        next();

}catch(err){
    console.error(err);
    res.status(401).json({error:"Invalid Token"})
    return err;
}


}

const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000})

}

module.exports = {jwtAuthMiddleware,generateToken}