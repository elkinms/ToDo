import React, { useState } from "react";

const Task = ({
                  id,
                  content,
                  status,
                  priority,
                  update,
                  selected,
                  onSelect,
                  isFirst = false,
                  isLast = false,
              }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newContent, setNewContent] = useState(content);
    const [newStatus, setNewStatus] = useState(status || "Not started");
    const [newPriority, setNewPriority] = useState(priority || "Medium");

    const handleSave = () => {
        update(id, {
            title: newContent,
            status: newStatus,
            priority: newPriority,
        });
        setIsEdit(false);
    };

    const trClass = [
        isFirst ? "rounded-tl-md" : "",
        isLast ? "rounded-bl-md" : "",
        "overflow-hidden"
    ].join(" ");

    return (
        <tr className={trClass}>
            <td className="border border-gray-300 px-4 py-2">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(id)}
                />
            </td>
            <td className="border border-gray-300 px-4 py-2" onClick={() => setIsEdit(true)}>
                {isEdit ? (
                    <input
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        onBlur={handleSave}
                        autoFocus
                        className="w-full"
                    />
                ) : (
                    <span>{newContent}</span>
                )}
            </td>
            <td className="border border-gray-300 px-4 py-2">
                <select
                    value={newStatus}
                    onChange={(e) => {
                        const value = e.target.value;
                        setNewStatus(value);
                        update(id, {
                            title: newContent,
                            status: value,
                            priority: newPriority,
                        });
                    }}
                >
                    <option>Not started</option>
                    <option>In progress</option>
                    <option>Done</option>
                </select>
            </td>
            <td className="border border-gray-300 px-4 py-2">
                <select
                    value={newPriority}
                    onChange={(e) => {
                        const value = e.target.value;
                        setNewPriority(value);
                        update(id, {
                            title: newContent,
                            status: newStatus,
                            priority: value,
                        });
                    }}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </td>
        </tr>
    );
};

export default Task;
