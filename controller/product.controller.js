import Product from "../models/product.model";
import asyncHandler from "express-async-handler";

//create a new product
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product(req.body).save();

  if (newProduct) {
    res.status(201).json(newProduct);
  } else {
    res.status(400);
    throw new Error("product was not created");
  }
});

//update a product
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct) {
    res.status(401);
    throw new Error("product was not updated");
  } else {
    res.status(201).json(updatedProduct);
  }
});

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    res.status(401);
    throw new Error("product was not deleted");
  } else {
    res.status(201).json("Product deleted successfully");
  }
});

// get product

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(401);
    throw new Error("product was not found");
  } else {
    res.status(200).json(product);
  }
});

//get all products

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
});
