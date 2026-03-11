//src\api\resumes.js
import { api } from "./client";

export async function getResume(id) {
  const { data } = await api.get(`/resumes/${id}`);
  return data; // { id, title, data_json, ... }
}

export async function createResume(payload) {
  const { data } = await api.post(`/resumes`, payload);
  return data; // { id }
}

export async function updateResume(id, payload) {
  const { data } = await api.put(`/resumes/${id}`, payload);
  return data; // { ok: true }
}
