const express = require('express')
const { postRegister, postLogin, postLogout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } = require('../controllers/authController.js')
const userMiddleware = require('../middlewares/authMiddleware.js')

const router = express.Router()

router.post('/register',postRegister)
router.post('/login',postLogin)
router.post('/logout',postLogout)
router.post('/send-verify-otp',userMiddleware,sendVerifyOtp)
router.post('/verify-account',userMiddleware,verifyEmail)
router.post('/is-auth',userMiddleware,isAuthenticated)
router.post('/send-reset-otp',sendResetOtp)
router.post('/reset-password',resetPassword)

module.exports = router;