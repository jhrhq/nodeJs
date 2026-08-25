import mongoose from 'mongoose';

const uri = `mongodb://localhost:27017/myDB`;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    if (err.isError(err)) {
      console.log('Database connection error ', err.message);
    } else {
      console.log('Database error');
    }
    process.exit(1);
  }
};
