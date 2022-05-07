import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
});
