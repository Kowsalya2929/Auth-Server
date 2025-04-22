const jwt = require('jsonwebtoken')

const userMiddleware = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({success: false,message: 'Not Authorized. Login Again'})
        }
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(tokenDecode.id){
            req.user = { id: tokenDecode.id };
        }else{
            return res.status(400).json({success: false,message: 'Not Authorized. Login Again'})
        }
        next()
    }catch(err){
        console.log(`User middelware error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}  

module.exports = userMiddleware;