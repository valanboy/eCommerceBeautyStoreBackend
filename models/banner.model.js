import mongoose from "mongoose";

//creating banner schema
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//creating banner model that will take banner schema upon importing
const Banner = mongoose.model("banner", bannerSchema)

export default Banner