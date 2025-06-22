
import Task from "../components/Task.jsx";
import {useState} from "react";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const deleteTask = (index) => {
        const tasksCopy = [...tasks];
        tasksCopy.splice(index, 1);
        setTasks(tasksCopy);
    }

    const updateTask = (index, text) => {
        const taskCopy = [...tasks];
        taskCopy[index] = text;
        setTasks(taskCopy);
    }

    const addTask = () => {
        setTasks([...tasks, 'New Task']);
    }

    return (
        <div className={'field'}>
            <button onClick={addTask} className={'btn new'}>Add task</button>
            {tasks.map((task, index) => <Task key={index} index={index} remove={deleteTask} update={updateTask} content={task}/>)}
        </div>
    )
}

export default TaskList;