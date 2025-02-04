import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/Database.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js"
import productRoute from "./routes/product.routes.js"

//configuring dotenv
dotenv.config();

//initializing express
const app = express();

//getting port from env
const PORT = process.env.PORT;

//MIDDLEWARES
//express json(body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser so we can make use of cookies
app.use(cookieParser())

//auth routes
app.use('/api/v1/auth/', authRoute)

//product routes
app.use('/api/v1/product/', productRoute)

//custom error middleware
app.use(notFound);
app.use(errorHandler);

//cors middleware
app.use(cors());



//server listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  //database connection
  connectDB();
});
