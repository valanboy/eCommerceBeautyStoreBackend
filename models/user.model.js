import mongoose from "mongoose"

const userSChema = new mongoose.Schema({
name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
}, 
address:{
    type: String
}, 
phone:{
    type: Number
}, 

role:{
    type: String,
    default: "user"
},
status:{
    type: Number,
    default: 0
},
Date:{
    type: Date,
    default: Date.now
}
},
{
    timestamps: true
})

const User = mongoose.model("user", userSChema)

export default User