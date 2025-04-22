const User = require('../models/authModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../config/nodemailer.js')

exports.postRegister=async(req,res)=>{
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({success: false, message: 'please fill all fields'})
        }
        const isEmail = await User.findOne({email})
        if(isEmail){
            return res.status(400).json({success: false, message: 'user email already exists'})
        }
        const hashedPass = await bcrypt.hash(password,10)
        const userRegister = await User.create({name, email, password: hashedPass})
        const token = jwt.sign({id: userRegister._id}, process.env.JWT_SECRET_KEY,{expiresIn: '7d'})
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to KowsiAmazon",      
            text: `Welcome to KowsiAmazon website, Your account has been created with email id : ${email}`
        }
        await transporter.sendMail(mailOptions)
        res.status(200).json({success: true, message: 'register posted'})
    } catch (err) {
        console.log(`register post err: ${err.message}`)
        res.status(500).json({success: false,message: 'internal server error'})
    }
}

exports.postLogin=async(req,res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({success: false, message: 'missing fields'})
        }
        const isEmail = await User.findOne({email})
        if(!isEmail){
            return res.status(400).json({success: false,message: 'user email is invalid'})
        }
        const isPass = await bcrypt.compare(password, isEmail.password)
        if(!isPass){
            return res.status(400).json({success: false, message: 'password is invalid'})
        }
        const token = jwt.sign({id: isEmail._id}, process.env.JWT_SECRET_KEY,{expiresIn: '7d'})
        res.cookie('token', token,{
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({success: true, message: 'user logged in'})
    } catch (err) {
        console.log(`login post err: ${err.message}`)
        res.status(500).json({success: false,message: 'internal server error'})
    }
}

exports.postLogout=async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        res.status(200).json({success: true, message : 'user logged out'})
    } catch (err) {
        console.log(`logout post err: ${err.message}`)
        res.status(500).json({success: false,message: 'internal server error'})
    }
}

exports.sendVerifyOtp = async (req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId)
        if(user.isAccountVerified){
            return res.status(400).json({success: false,message: 'Account already verified'})
        }
        const otp = String(Math.floor(100000 + Math.random()* 900000))
        user.verifiedOtp = otp;
        user.verifiedOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save()
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        }
        await transporter.sendMail(mailOptions);
        res.status(201).json({success: true,message: "Verification OTP Sent on Email"})
    }catch(err){
        console.log(`Send verify otp error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}


exports.verifyEmail = async(req,res)=>{
    const userId = req.user.id;
    const {otp} = req.body;
    if(!userId || !otp){
        return res.status(400).json({success: false,message: 'Missing Details'})
    }
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({success: false,message: 'User not found'})
        }
        if(user.verifiedOtp === "" || user.verifiedOtp !== otp){
            return res.status(400).json({success: false,message: 'invalid OTP'})
        }
        if(user.verifiedOtpExpireAt < Date.now()){
            return res.status(400).json({success: false,message: 'OTP Expired'})
        }
        user.isAccountVerified = true;
        user.verifiedOtp = "";
        user.verifiedOtpExpireAt=0;
        await user.save()
        return res.status(200).json({success: true,message: "Email Verified Successfully"})
    }catch(err){
        console.log(`Verify Email Error : ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

exports.isAuthenticated = async(req,res)=>{
    try{
        return res.status(200).json({success: true})
    }catch(err){
        console.log(`Authentication error : ${err.message}`)
        res.status(500).json({success: false,message: err.message})
    }
}

exports.sendResetOtp = async(req,res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success: false,message: 'Email is required'})
        }
        const isEmail = await User.findOne({email})
        if(!isEmail){
            return res.status(400).json({success: false,message: 'User not found'})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        isEmail.resetOtp = otp;
        isEmail.resetOtpExpireAt = Date.now() + 15*60*1000;
        await isEmail.save()
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: isEmail.email,
            subject: "Password Reset OTP",
            text: `Your OTP is for resetting your password is ${otp}. Use this OTP to proceed with restting your passsword.`
        }
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true,message: "OTP sent to your email"})
    }catch(err){
        console.log(`Send reset otp error : ${err.message}`)
        res.status(500).json({success: false,message: err.message})
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const {email,otp,newPassword} = req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({success: false,message: 'Missing Details'})
        }
        const isEmail = await User.findOne({email})
        if(!isEmail){
            return res.status(400).json({success: false,message: 'Email not found'})
        }
        if (!isEmail.resetOtp || isEmail.resetOtp !== otp.toString()) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
        if(isEmail.resetOtpExpireAt < Date.now()){
            return res.status(400).json({success: false,message: 'OTP Expired'})
        }
        const hasedPass = await bcrypt.hash(newPassword,10)
        isEmail.password = hasedPass;
        isEmail.resetOtp = "";
        isEmail.resetOtpExpireAt = 0;
        await isEmail.save()
        res.status(200).json({success: true,message : 'Password has been reset successfully'})
    }catch(err){
        res.status(500).json({success: false,message: err.message})
    }
}