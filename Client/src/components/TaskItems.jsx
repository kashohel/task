import { useState } from "react";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const isDone = task.status === "completed";
  const [title, setTitle] = useState(task.title);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (onEdit) {
      onEdit({ ...task, title: e.target.value });
    }
  };
  return (
    <li className="flex items-center justify-between rounded-2xl border border-gray-200 p-3 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={isDone} onChange={() => onToggle(task)} className="size-5" />
        <div>
          <p className={`font-medium ${
              isDone ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            <input onChange={handleTitleChange} type="text" value={title} className="border-0 focus:border-0border-none focus:outline-none focus:ring-0" />
          </p>
          <p className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <button onClick={() => onDelete(task._id)} className="text-sm text-red-600 hover:text-red-700" >
        Delete
      </button>
    </li>
  );
}
