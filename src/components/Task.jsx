import React, {useRef, useState} from "react";

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

export default Task;