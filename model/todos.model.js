import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    description: {
      default: '',
      type: String,
    },
    isCompleted: {
      default: false,
      type: Boolean,
    },
    title: { required: [true, 'Title is required'], trim: true, type: String },
  },
  { timestamps: true },
);

export default mongoose.model('Todo', todoSchema);
