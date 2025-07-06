import { useState, useEffect } from "react";
import Task from "../components/Task.jsx";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    // загрузка при старте
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await fetch("http://localhost:8080/todo");
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    };

    const addTask = async (newContent) => {
        try {
            await fetch("http://localhost:8080/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newContent })
            });
            await loadTasks(); // загрузим список заново
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const deleteTask = async (index) => {
        const id = tasks[index]._id;
        try {
            await fetch(`http://localhost:8080/todo/${id}`, {
                method: "DELETE"
            });
            await loadTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const updateTask = async (index, text) => {
        const id = tasks[index]._id;
        try {
            await fetch(`http://localhost:8080/todo/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: text })
            });
            await loadTasks();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    return (
        <div className={'field'}>
            <button onClick={() => addTask('new task')} className={'btn new'}>
                Add task
            </button>
            {tasks.map((task, index) => (
                <Task
                    key={task._id}
                    index={index}
                    remove={deleteTask}
                    update={updateTask}
                    content={task.title}
                />
            ))}
        </div>
    );
};

export default TaskList;
