import express from "express";
import { registerUser, loginUser, logoutUser } from "../controller/auth.controller.js";
const router = express.Router()

//route for registering a user
router.post("/register", registerUser)

//route for logging in a user
router.post("/login", loginUser)

//route for logging out a user
router.post('/logout', logoutUser)

export default router;