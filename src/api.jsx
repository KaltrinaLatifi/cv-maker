//src\api.jsx
export const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const token = localStorage.getItem("jwt");


  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data;
}

// ---- existing exports (kept) ----
export const addExperience = (body) =>
  request(`/api/cv/experience`, { method: "POST", body });

export const listExperiences = (cvId) =>
  request(`/api/cv/experience/${cvId}`);

export const getMe = () => request(`/api/me`);

// ---- NEW: export an `api` helper for AuthContext.jsx ----
export const api = {
  request,
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
};
