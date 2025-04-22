const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected Successfully')
    }catch(err){
        console.log(`MongoDB Connection Error : ${err.message}`)
        process.exit(1) //1 means is fail 0 means is success
    }
}

module.exports = connectDB;