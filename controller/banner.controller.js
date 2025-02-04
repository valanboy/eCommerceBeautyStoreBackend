import bannerModel from '../models/banner.model.js';
import asyncHandler from 'express-async-handler';

//create a new banner
const createBanner = asyncHandler(async (req, res) => {
  const newBanner = await bannerModel(req.body).save();

  if (!newBanner) {
   throw new error("banner was not created");
  } else {
    res.status(201).json(newBanner);
  }
});