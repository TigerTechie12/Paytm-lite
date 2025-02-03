const {JWT_SECRET}=require("./config")
const jwt=require("jsonwebtoken")
const authMiddleware=(req,res)=>{
    const authorization = req.headers.authorization
    if(!authorization || !authorization.startsWith('Bearer')){
        return res.status(403).json({message: 'Unauthorized: No token provided.'})
    }
    const token=authorization.split(' ')[1]
    try{
        const decoded=jwt.verify(token,JWT_SECRET)
     if(decoded)   {req.userId=decoded.userId
        next()}
        else{return res.status(403)}
    }
    catch(err){return res.status(403)}
}
module.exports={authMiddleware}