import { useEffect, useState } from "react";
import { getTasks } from "../api/client.js";

const POLL_INTERVAL_MS = 5000;

export function useTaskPolling(token, filter) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  function load(currentFilter) {
    getTasks(token, { page: 1, status: currentFilter.status, assigneeId: currentFilter.assigneeId })
      .then((result) => setTasks(result.items))
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    load(filter);
  }, [token, filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      load(filter);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [token]);

  return { tasks, error };
}
