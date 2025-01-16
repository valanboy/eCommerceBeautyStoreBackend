import dotenv  from "dotenv"
import jwt from "jsonwebtoken"

//configuring dotenv
dotenv.config()

//getting jwt secret from env
const jwtSecret = process.env.jwtSecret

//function to generate jwt token
const generateJwtToken = (id) => {
   const token = jwt.sign({id}, jwtSecret, {
        expiresIn: "14d"
    })

    res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "none",
        //max age of cookie(it is in milliseconds, so 14 days because 1000ms = 1s, 60s1m, 60m`1h, 24h`1d, 14d`1w)
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
}

export default generateJwtToken