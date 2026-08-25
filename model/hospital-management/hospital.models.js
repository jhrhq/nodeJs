import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema(
  {
    addresLin1: {
      required: true,
      type: String,
    },
    addresLin2: {
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    pincode: {
      required: true,
      type: String,
    },
    specializedIn: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
);

export const Hospital = mongoose.model('Hospital', hospitalSchema);
