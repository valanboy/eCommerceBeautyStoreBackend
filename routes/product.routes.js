import { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts, ratingProduct  } from '../controller/product.controller.js';
import express from 'express';
const router = express.Router();

//rating a product
router.put('/rating/:id', ratingProduct);

//create a new product
router.post('/', createProduct);

//update a product
router.put('/:id', updateProduct);

//get a product
router.get('/find/:id', getProduct);

//get all products
router.get('/', getAllProducts);

//delete a product
router.delete('/:id', deleteProduct);