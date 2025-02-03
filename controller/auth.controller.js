import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateJwtToken.js";

//REGISTER USER using asyncHandler to wrap the function
// route POST /api/v1/auth/register
// access public
//asyncHandler is a middleware that wraps around the function and catches any errors that are thrown and sends them to the error handlinng middleware created in the error.middleware.js file
 
const registerUser = asyncHandler(async (req, res) => {
  //get the name, email and password from the request body from the frontend
  const { name, email, password } = req.body;

  //check if the user already exists by checking if the email is already in the database
  const userExists = await User.findOne({ email });

  //if the user exists, send a 400 status code and throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists"); //stops further execution of code below 
    }
  //create a new user if the user does not exist
  const user = await User.create({
    name,
    email,
    password,
  });

  //check if the user has been created and generate a token for the user
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data"); //stops further execution of code below 
  }
});

//LOGIN USER using asyncHandler to wrap the function
// route POST /api/v1/auth/login
// access public

const loginUser = asyncHandler(async(req, res)=>{

    //get the email and password from the request body from the frontend
    const { email, password } = req.body;

    //check if the user exists by checking if the email is already in the database
    let user = await User.findOne({email})

    //if the user does not exist, send a 400 status code and throw an error
      //check if the password matches the password in the database
     let isMatch = await user.matchPassword(password) //match password method is gotten from the userschema when creating the model

    if(!user && !isMatch){
        res.status(401)
        throw new Error("Invalid email or password") //stops further execution of code below 
    }
 
    //generate jwt token for the user
    generateToken(res, user._id)
res.status(200).json({
 _id: user._id,
      name: user.name,
      email: user.email
})

})


//LOGOUT USER -rather than just clearing the local storage of the frontend, we also need to clrea the cookie from the browser
//route POST /api/v1/auth/logout  why POST? this is because we are sending a response message to the frontend after clearing the cookie
//access public
const logoutUser = asyncHandler(async(req, res)=>{
res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0)
});

res.status(200).json({message: "Logout successfull"})
})

export {registerUser, loginUser, logoutUser}