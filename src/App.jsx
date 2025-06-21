import React, { useState, useRef } from 'react';

import './App.css';

const Task = ({content, index, remove, update}) => {
    const [isEdit, setIsEdit] = useState(false);
    const textId = useRef();

    const handleClickEdit = () => {
        setIsEdit(true);
    }

    const handleClickSave = () => {
        update(index, textId.current.value);
        setIsEdit(false);
    }

    const handleClickRemove = () => {
        remove(index);
    }

    if(isEdit) {
        return (
            <div className={'box'}>
                <textarea ref={textId} defaultValue={content}></textarea>
                <button onClick={handleClickSave} className={'btn success'}>Save</button>
            </div>
        )
    } else {
        return (
            <div className={'box'}>
                <div>{content}</div>
                <button onClick={handleClickEdit} className={'btn light'}>Edit</button>
                <button onClick={handleClickRemove} className={'btn red'}>Remove</button>
            </div>
        )
    }
}

const App = () => {
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

export default App;
