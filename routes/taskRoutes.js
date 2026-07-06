import express from 'express';
import { listTasks, createTask, completeTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', listTasks);
router.post('/', createTask);
router.patch('/:id', completeTask);
router.delete('/:id', deleteTask);

export default router;