import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addresLin1: {
      type: String,
      required: true,
    },
    addresLin2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    specializedIn: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
);

export const Hospital = mongoose.model("Hospital", hospitalSchema);
