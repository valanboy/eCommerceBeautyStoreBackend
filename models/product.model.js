import mongoose from "mongoose";

//creating product schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
    whatinbox: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    wholesalePrice: {
      type: Number,
    },
    wholesaleMinimumQuantity: {
      type: Number,
    },
    categories: {
      type: Array,
    },
    concern: {
      type: Array,
    },
    brand: {
      type: String,
    },
    skintype: {
      type: Array,
    },
    originalPrice: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    ratings: [
      {
        star: { type: String },
        name: { type: String },
        comment: { type: String },
        postedAt: { type: Date },
        postedBy: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
 
//creating index for search functionality in product schema so the product.controller.js search logic can work
productSchema.index({"$**": "text"});

//creating product model that will take user schema upon importing
const Product = mongoose.model("product", productSchema);

export default Product;
