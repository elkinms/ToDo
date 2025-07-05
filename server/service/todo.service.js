import todoRepository from '../repository/todo.repository.js'

class TodoService {
    async createTask(title) {
        return await todoRepository.createTask(title);
    }

    async getAllTasks() {

    }

    async updateTask(id, title) {
        return await todoRepository.updateTask(id, title);
    }

    async deleteTask(id) {
        return await todoRepository.deleteTask(id);
    }
}

export default new TodoService();