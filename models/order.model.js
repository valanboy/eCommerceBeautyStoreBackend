import mongoose from "mongoose";

//creating order schema
const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//creating order model that will take user schema upon importing
const Order = mongoose.model("order", orderSchema);

export default Order;
