import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
  },
  { timeStamps: true },
);

export const Category = mongoose.model('Category', categorySchema);
