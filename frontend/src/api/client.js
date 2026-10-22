const BASE_URL = "/api";

async function request(path, { method = "GET", token, body } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function login(username, password) {
  return request("/auth/login", { method: "POST", body: { username, password } });
}

export function refreshSession(token) {
  return request("/auth/refresh", { method: "POST", body: { token } });
}

export function getTasks(token, { page = 1, status, assigneeId } = {}) {
  const params = new URLSearchParams({ page: String(page) });
  if (status) params.set("status", status);
  if (assigneeId) params.set("assigneeId", assigneeId);

  return request(`/tasks?${params.toString()}`, { token });
}
