import express from 'express';
import { todoPage } from '../controller/todo.controller.js';

const router = express.Router();

router.get('/', todoPage);

export default router;
