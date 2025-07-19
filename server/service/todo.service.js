import todoRepository from '../repository/todo.repository.js'

class TodoService {
    async createTask(taskData) {
        return await todoRepository.createTask(taskData);
    }

    async getAllTasksByUser(userId) {
        return await todoRepository.findAllTasksUser(userId);
    }

    async updateTask(id, title) {
        return await todoRepository.updateTask(id, title);
    }

    async deleteTask(id) {
        return await todoRepository.deleteTask(id);
    }
}

export default new TodoService();