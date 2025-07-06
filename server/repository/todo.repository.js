import Todo from '../models/toDo.js';

class TodoRepository {
    async createTask(title) {
        const task = new Todo(title);
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