import jwt from 'jsonwebtoken'

const userMiddleware = async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({success: false,message: 'Not Authorized. Login Again'})
        }
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = { id: tokenDecode.id };    
        next()
    }catch(err){
        console.log(`User middelware error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}  

export default userMiddleware;