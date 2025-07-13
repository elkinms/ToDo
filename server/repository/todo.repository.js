import Todo from '../models/toDo.js';

class TodoRepository {
    async createTask(taskData) {
        const task = new Todo(taskData);
        return await task.save();
    }

    async findAllTasks() {
        return await Todo.find();
    }

    async updateTask(id, updateData) {
        return Todo.findByIdAndUpdate(id, updateData, {new: true});
    }

    async deleteTask(id) {
        return Todo.findByIdAndDelete(id);

    }

}

export default new TodoRepository();