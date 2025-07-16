import Todo from '../models/toDo.js';

class TodoRepository {
    async createTask(taskData) {
        const task = new Todo(taskData);
        return await task.save();
    }

    async findAllTasks() {
        return await Todo.find();
    }

    async findAllTasksUser(userId) {
        return await Todo.find({owner: userId });
    }

    async updateTask(id, updateData) {
        return Todo.findByIdAndUpdate(id, updateData, {new: true});
    }

    async deleteTask(id) {
        return Todo.findByIdAndDelete(id);

    }

}

export default new TodoRepository();