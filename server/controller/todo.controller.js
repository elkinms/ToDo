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

    // async getAllTasks(req, res, next) {
    //     try {
    //         return res.status(200).json({});
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    async updateTask(req, res, next) {
        try {
            const task = await todoService.updateTask(req.param.id, req.body);
            res.json(task);
        } catch (err) {
            next(err);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const task = await todoService.deleteTask(req.param.id);
            res.json(task);
        } catch (err) {
            next(err);
        }
    }
}

export default new TodoController();
