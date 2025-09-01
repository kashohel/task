import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd(t);
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2 w-full">
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Add new task…" />
      <button type="submit" className="rounded-xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition">
        Add
      </button>
    </form>
  );
}
