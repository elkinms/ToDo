import todoService from "../service/todo.service.js";

class TodoController {
    async createTask(req, res, next) {
        try {
            const task = await todoService.createTask(req.body);
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    }

    async getAllTasks(req, res, next) {
        try {
            const tasks = await todoService.getAllTasks()
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
