import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    address: {
      required: true,
      type: String,
    },
    admittedIn: {
      ref: 'Hospital',
      type: mongoose.Schema.Types.ObjectId,
    },
    age: {
      required: true,
      type: Number,
    },
    bloodGroup: {
      required: true,
      type: String,
    },
    diagnosedWith: {
      required: true,
      type: String,
    },
    gender: {
      enum: ['M', 'F', 'O'],
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const Patient = mongoose.model('Patient', patientSchema);
