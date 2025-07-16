import { useState, useEffect } from "react";
import Task from "../components/Task.jsx";

const TaskList = ({ onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await fetch("http://localhost:8080/todo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                onLogout();
                return;
            }

            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    };

    const addTask = async (newContent) => {
        try {
            const res = await fetch("http://localhost:8080/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: newContent }),
            });

            if (res.status === 401) {
                onLogout();
                return;
            }

            await loadTasks();
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/todo/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401) {
                onLogout();
                return;
            }

            await loadTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    const updateTask = async (id, text) => {
        try {
            const res = await fetch(`http://localhost:8080/todo/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: text }),
            });

            if (res.status === 401) {
                onLogout();
                return;
            }

            await loadTasks();
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        onLogout();
    };

    return (
        <div className={"field"}>
            <div className={"box"}>
                <button onClick={() => addTask("new task")} className={"btn new"}>
                    Add task
                </button>
                <button onClick={handleLogoutClick} className={"btn"} style={{ marginLeft: '10px' }}>
                    Logout
                </button>
            </div>
            {tasks.map((task) => {
                console.log("MAP TASK:", task);
                return (
                    <Task
                        key={task.id || task._id}
                        id={task.id || task._id}
                        remove={deleteTask}
                        update={updateTask}
                        content={task.title}
                    />
                );
            })}
        </div>
    );
};

export default TaskList;
