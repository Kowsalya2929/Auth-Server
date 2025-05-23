import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './config/connectDB.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import path from 'path'

const __dirname = path.resolve()

const app = express()
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
}

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port : ${process.env.PORT}`)
})