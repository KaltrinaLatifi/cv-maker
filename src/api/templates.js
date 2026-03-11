// src/api/templates.js
import { api } from "./client";

// GET all templates
export async function getTemplates() {
  const { data } = await api.get("/templates");
  return data; // always return the array
}

// Create a new template (multipart/form-data)
export async function createTemplate(formData) {
  return api.post("/templates", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Update template by ID
export async function updateTemplate(id, payload) {
  return api.put(`/templates/${id}`, payload);
}

// Delete template by ID
export async function deleteTemplate(id) {
  return api.delete(`/templates/${id}`);
}
