import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    ref: 'Product',
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    default: 0,
    required: true,
    type: Number,
  },
});

const orderSchema = new mongoose.Schema(
  {
    address: {
      required: true,
      type: String,
    },
    customer: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    orderItems: {
      type: [orderItemSchema],
    },
    orderPrice: {
      required: true,
      type: Number,
    },
    status: {
      default: 'PENDING ',
      enum: ['PENDING', 'CANCELLED', 'DELIVERED'],
      types: String,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model('Order', orderSchema);
