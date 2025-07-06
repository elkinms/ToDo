import express from 'express';
import todoController from '../controller/todo.controller.js'

const router = express.Router();


router.get('/test', (req, res) => {
    res.json({ message: "Router is working!" });
});

router.post('/todo', todoController.createTask);
router.get('/todo', todoController.getAllTasks);
router.patch('/todo/:id', todoController.updateTask);
router.delete('/todo/:id', todoController.deleteTask);

export default router;