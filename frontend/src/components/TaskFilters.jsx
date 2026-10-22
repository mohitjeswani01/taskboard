const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];

export default function TaskFilters({ filter, onChange }) {
  return (
    <div className="task-filters">
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={filter.status === option.value ? "active" : ""}
          onClick={() => onChange({ ...filter, status: option.value })}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
