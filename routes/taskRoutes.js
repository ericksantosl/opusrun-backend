import express from 'express';
import { listTasks, createTask, completeTask, deleteTask } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, listTasks);
router.post('/', authMiddleware, createTask);
router.patch('/:id', authMiddleware, completeTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;