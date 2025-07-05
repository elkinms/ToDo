import express from 'express';
import todoController from '../controller/todo.controller.js'

const router = express.Router();

router.post('/todo', todoController.createTask);
// router.get();
router.patch('/todo/:id', todoController.updateTask);
router.delete('/todo/:id', todoController.deleteTask);

export default router;