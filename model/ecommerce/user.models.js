import mongoose from 'mongoose';

const userSchema = new mongoose.Model(
  {
    email: {
      lowercase: true,
      required: true,
      type: String,
    },
    name: {
      lowercase: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
