import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    categoty: {
      ref: 'Category',
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    owner: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    price: {
      default: 0,
      type: Number,
    },
    productImage: {
      type: String,
    },
    stock: {
      default: 0,
      type: Number,
    },
  },
  { timeStamps: true },
);

export const Product = mongoose.model('Product', productSchema);
