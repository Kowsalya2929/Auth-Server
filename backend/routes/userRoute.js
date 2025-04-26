import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getUserData } from '../controllers/userController.js'

const router = express.Router()

router.get('/data',authMiddleware,getUserData)

export default router;