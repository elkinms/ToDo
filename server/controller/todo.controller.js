import TodoService from "../service/todo.service.js";

class TodoController {
    async createTask(req, res, next) {
        try {
            // servise
        } catch (err) {
            next(err);
        }
    }

    async getAllTasks(req, res, next) {
        try {
            return res.status(200).json({});
        } catch (err) {
            next(err);
        }
    }

    async updateTask(req, res, next) {
        try {
            // твоя логика
        } catch (err) {
            next(err);
        }
    }

    async deleteTask(req, res, next) {
        try {
            // твоя логика
        } catch (err) {
            next(err);
        }
    }
}

export default new TodoController();
