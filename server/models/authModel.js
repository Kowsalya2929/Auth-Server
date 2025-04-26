import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    verifiedOtp:{type: String, default: ''},
    verifiedOtpExpireAt:{type: Number, default: 0},
    isAccountVerified:{type: Boolean, default: false},
    resetOtp:{type: String, default: ''},
    resetOtpExpireAt:{type: Number, default: 0}
})

export const User = mongoose.model('User',UserSchema)

export default User;
