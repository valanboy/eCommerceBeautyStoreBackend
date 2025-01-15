import mongoose from "mongoose";
import dotenv from "dotenv"

//configuring dotenv
dotenv.config()

//getting db url from env
const dbUrl = process.env.dbUrl

//export function connecting to db
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