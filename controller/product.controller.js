import { error } from "console";
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

const getAllProducts = asyncHandler(async (req, res) => {

  const qnew = req.query.new;   //new is a query parameter
  const qcategory = req.query.category; //category is a query parameter
  const qsearch = req.query.search; //search is a query parameter

  let products;

if(qnew){
products = await Product.find().sort({createdAt: -1});
}else if(qcategory){
products = await Product.find({categories:{$in:[qcategory]}})
}else if(qsearch){
  products = await Product.find({$text:{
    $search:qsearch,
    $caseSensitive:false,
    $diacriticSensitive:false,
  }})
}else{
products = await Product.find().sort({createdAt: -1});
}

});


//rating a product

const ratingProduct = asyncHandler(async (req, res) => {
  const {star, name, comment, postedBy} = req.body;

  if(star && name && comment && postedBy){
    const postedBy = await Product.findById(req.params.id,
      {$push:{ratings:{star, name, comment, postedBy}}},
      {new:true}
      );
      res.status(200).json("product rated successfully!");
  }else{
    res.status(400)
    throw new error("product rating failed");
  }
})

export { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts, ratingProduct };