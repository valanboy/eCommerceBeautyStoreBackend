import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//creating user schema
const userSChema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },

    role: {
      type: String,
      default: "user",
    },
    status: {
      type: Number,
      default: 0,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

//hasing the password before saving to mongodb database
userSChema.pre("save", async function (next) {
  //skip if password is not modified
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//match user entered password to hashed password in database
userSChema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//creating user model that will take user schema upon importing
const User = mongoose.model("user", userSChema);

export default User;
