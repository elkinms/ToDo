import todoService from "../service/todo.service.js";

class TodoController {

    async createTask(req, res, next) {
        const taskData = {...req.body, owner: req.user.userId};
        try {
            const task = await todoService.createTask(taskData);
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    }

    async getAllTasks(req, res, next) {
        try {
            const tasks = await todoService.getAllTasksByUser(req.user.userId);
            return res.json(tasks);
        } catch (err) {
            next(err);
        }
    }


    async updateTask(req, res, next) {
        try {
            const task = await todoService.updateTask(req.params.id, req.body);
            res.json(task);
        } catch (err) {
            next(err);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const task = await todoService.deleteTask(req.params.id);

            res.json(task);
        } catch (err) {
            next(err);
        }
    }
}

export default new TodoController();
