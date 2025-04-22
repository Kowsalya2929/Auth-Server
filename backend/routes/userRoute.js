const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware.js')
const { getUserData } = require('../controllers/userController.js')

const router = express.Router()

router.get('/data',authMiddleware,getUserData)

module.exports = router;