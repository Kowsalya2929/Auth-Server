const mongoose = require('mongoose')

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

module.exports = mongoose.model('User',UserSchema)
