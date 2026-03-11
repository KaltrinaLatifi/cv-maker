// src/api/users.js
import { api } from "./client";

// admin-only
export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function updateUserRole(userId, role) {
  const { data } = await api.put(`/users/${userId}/role`, { role });
  return data;
}

// current logged-in user profile
export async function getCurrentUser() {
  const { data } = await api.get("/auth/me"); // or "/me" depending on your route usage
  return data;
}

export async function updateCurrentUser(payload) {
  const { data } = await api.put("/auth/me", payload); // or "/me"
  return data;
}
