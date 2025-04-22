require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectDB')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute.js')
const app = express()
connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port : ${process.env.PORT}`)
})