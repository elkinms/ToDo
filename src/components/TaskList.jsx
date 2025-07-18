import { useState, useEffect } from "react";
import Task from "./Task.jsx";
import Header from "./Header.jsx";

const TaskList = ({ onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await fetch("http://localhost:8080/todo", {
                headers: { Authorization: `Bearer ${token}` },
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

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const res = await fetch("http://localhost:8080/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: newTaskTitle,
                    status: "Not started",
                    priority: "Medium",
                }),
            });

            if (res.status === 401) {
                onLogout();
                return;
            }

            setNewTaskTitle("");
            await loadTasks();
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    const deleteSelectedTasks = async () => {
        for (const id of selectedIds) {
            try {
                const res = await fetch(`http://localhost:8080/todo/${id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.status === 401) {
                    onLogout();
                    return;
                }
            } catch (err) {
                console.error("Error deleting task:", err);
            }
        }

        setSelectedIds([]);
        await loadTasks();
    };

    const updateTask = async (id, updatedData) => {
        try {
            const res = await fetch(`http://localhost:8080/todo/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
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

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === tasks.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(tasks.map((t) => t.id || t._id));
        }
    };

    return (
        <div className="pl-2 w-full">
            <Header
                options={[{ label: "Log out", value: "logout" }]}
                onOptionClick={(value) => {
                    if (value === "logout") {
                        localStorage.removeItem("token");
                        onLogout();
                    }
                }}
            />

            <table className="table-auto w-full border-separate border-spacing-0">
                <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2 w-12 text-center rounded-tl-md">
                        <input
                            type="checkbox"
                            checked={
                                selectedIds.length === tasks.length && tasks.length > 0
                            }
                            onChange={toggleSelectAll}
                        />
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Task</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Priority</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        content={task.title}
                        status={task.status}
                        priority={task.priority}
                        update={updateTask}
                        selected={selectedIds.includes(task.id)}
                        onSelect={toggleSelect}
                        isFirst={index === 0}
                        isLast={index === tasks.length - 1}
                    />
                ))}
                <tr>
                    <td className="border border-gray-300 px-4 py-2 text-center rounded-bl-md"></td>
                    <td className="border border-gray-300 px-4 py-2" colSpan={3}>
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") addTask();
                            }}
                            placeholder="+ Add task"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            {selectedIds.length > 0 && (
                <div className="flex justify-end mt-4">
                    <button
                        onClick={deleteSelectedTasks}
                        className="px-4 py-2 bg-white text-gray-700 rounded shadow hover:bg-gray-100"
                    >
                        Delete selected
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
