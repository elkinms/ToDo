import express from 'express';
import todoController from '../controllers/todo.controller.js';
import auth from '../middleware/authorization.js';

const router = express.Router();


router.get('/test', (req, res) => {
    res.json({ message: "Router is working!" });
});

router.post('/todo',auth, todoController.createTask);
router.get('/todo', auth, todoController.getAllTasks);
router.patch('/todo/:id', todoController.updateTask);
router.delete('/todo/:id', todoController.deleteTask);

export default router;