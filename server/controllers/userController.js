import User from '../models/authModel.js'

export const getUserData = async(req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({success: false,message: 'User not found'})
        }
        res.status(200)
        .json({
            success: true,
            data: {
                name: user.name,
                isAccountVerified: user.isAccountVerified,
            }
        })
    }catch(err){
        console.log(`Get user data error : ${err.message}`)
        res.status(500).json({success: false,message: err.message})
    }
}