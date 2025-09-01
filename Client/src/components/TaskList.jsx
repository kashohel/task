import TaskItem from './TaskItems';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Need to add new task to listed heere
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
