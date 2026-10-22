export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks match this filter.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task task-${task.status}`}>
          <span className="task-title">{task.title}</span>
          <span className="task-status">{task.status.replace("_", " ")}</span>
        </li>
      ))}
    </ul>
  );
}
