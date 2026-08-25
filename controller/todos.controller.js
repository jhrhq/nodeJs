import Todo from '../model/todos.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({
      message: 'Title is required',
      success: false,
    });
  }
  const todo = await Todo.create({
    description,
    title,
  });

  return res.status(201).json({ message: 'Todo created successfully', success: true, todo });
});

export const getTodos = asyncHandler(async (req, res) => {
  const { search, sort, page = 1, limit = 10 } = req;

  const query = {};

  // search by title
  if (search) {
    query.title = { $options: 'i', $regex: search };
  }
  // sorting
  const sortOption = {};
  if (sort === 'asc') sortOption.createdAt = 1;
  else sortOption.createdAt = -1;

  // pagination
  const skip = (page - 1) * limit;
  const todos = await Todo.find(query).sort(sortOption).skip(skip).limit(parseInt(limit));

  return res.status(200).json({
    data: todos,
    limit: Number(limit),
    message: 'Todos fetched successfully',
    page: Number(page),
    success: true,
  });
});

export const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // if (!mongoose.Types.ObjectId(id)) {
  //   return res.status(400).json({ success: false, message: "Invalid Id" });
  // }
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found', success: false });
  }

  return res.status(200).json({
    data: todo,
    message: 'Todos fetched successfully',
    success: true,
  });
});
export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title not found', success: false });
  }

  const todo = await Todo.findByIdAndUpdate(id, { description, title }, { new: true });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found', success: false });
  }

  return res.status(200).json({
    data: todo,
    message: 'Todos fetched successfully',
    success: true,
  });
});
export const toggleTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: 'Todo Id not found', success: false });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found', success: false });
  }

  todo.isCompleted = !todo.isCompleted;
  await todo.save();

  return res.status(200).json({
    data: todo,
    message: 'Todos fetched successfully',
    success: true,
  });
});
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: 'Todo Id not found', success: false });
  }

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found', success: false });
  }

  return res.status(200).json({
    data: todo,
    message: 'Todo deleted successfully',
    success: true,
  });
});
