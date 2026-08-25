import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    exprienceInYears: {
      default: 0,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    qualification: {
      required: true,
      type: String,
    },
    salary: {
      required: true,
      type: String,
    },
    worksInHospitals: {
      required: true,
      type: [
        {
          ref: 'Hospital',
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
  },
  { timestamps: true },
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
