const { tasks } = require("../data/seed");

const DEFAULT_PAGE_SIZE = 5;

function listTasks({ page = 1, pageSize = DEFAULT_PAGE_SIZE, status, assigneeId } = {}) {
  let filtered = tasks;
  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }
  if (assigneeId) {
    filtered = filtered.filter((t) => t.assigneeId === assigneeId);
  }

  const offset = page * pageSize;
  const items = filtered.slice(offset, offset + pageSize);

  return {
    items,
    page,
    pageSize,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / pageSize),
  };
}

module.exports = { listTasks, DEFAULT_PAGE_SIZE };
