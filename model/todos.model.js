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
    title: {
      required: [true, 'Title is required'],
      trim: true,
      type: String,
      validate: {
        message: (props) => `${props.value} is not a valid username (cannot contain 'admin')!`,
        validator: (value) => !value.toLowerCase().includes('admin'),
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

todoSchema.virtual('titleDescription').get(function () {
  return `${this.title} ${this.description}`;
});

/* todoSchema.virtual('description').set(function (des) {
  const parts = des.split(' ');
  this.title = parts[0];
  this.description = parts[1];
}); */

export default mongoose.model('Todo', todoSchema);
