import Todo from '../models/toDo.js';

class TodoRepository {
    async createTask(taskData) {
        const task = new Todo(taskData);
        return await task.save();
    }

    async findAllTasks() {

    }

    async updateTask(id, task) {

    }

    async deleteTask(id) {

    }

}

export default new TodoRepository();