const users = [
  { id: "u1", username: "amara", password: "password123", name: "Amara Okafor" },
  { id: "u2", username: "devon", password: "password123", name: "Devon Pierce" },
];

const tasks = [
  { id: "t1", title: "Set up CI pipeline", status: "done", assigneeId: "u1" },
  { id: "t2", title: "Write onboarding docs", status: "done", assigneeId: "u2" },
  { id: "t3", title: "Design task detail page", status: "in_progress", assigneeId: "u1" },
  { id: "t4", title: "Fix flaky login test", status: "in_progress", assigneeId: "u2" },
  { id: "t5", title: "Add dark mode toggle", status: "todo", assigneeId: "u1" },
  { id: "t6", title: "Migrate database to Postgres", status: "todo", assigneeId: "u2" },
  { id: "t7", title: "Write API docs", status: "todo", assigneeId: "u1" },
  { id: "t8", title: "Add task filtering by assignee", status: "in_progress", assigneeId: "u2" },
  { id: "t9", title: "Set up error tracking", status: "todo", assigneeId: "u1" },
  { id: "t10", title: "Improve empty states", status: "todo", assigneeId: "u2" },
  { id: "t11", title: "Add keyboard shortcuts", status: "todo", assigneeId: "u1" },
  { id: "t12", title: "Write load tests for the API", status: "todo", assigneeId: "u2" },
];

module.exports = { users, tasks };
