import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const dbUrl = process.env.dbUrl
export const connectDB = async() => {
    try {
       await mongoose.connect(dbUrl).then(()=>{
        console.log("DB connected successfully")
       })
       
    } catch (error) {
        console.log(`cannot connect to db: ${error.message}`)
        setTimeout(connectDB, 5000)
    }
    
}