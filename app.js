import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./utils/Database.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//MIDDLEWARES
//express json(body)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cors
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//server listening

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

//database connection
connectDB()
});