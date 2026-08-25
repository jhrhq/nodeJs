import express from 'express';
import { connectDB } from '../config/db.js';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  toggleTodo,
  updateTodo,
} from '../controller/todos.controller.js';

connectDB();
const router = express.Router();

router.get('/', getTodos);
router.get('/:id', getTodoById);

router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/toggle', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;
