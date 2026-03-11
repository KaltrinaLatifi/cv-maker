// src/api/cv.js
import { api } from "./client"; // your axios instance

// Save templateId into the CVS table
export async function updateCvTemplate(cvId, templateId) {
  const { data } = await api.put(`/cv/${cvId}/template`, { templateId });
  return data; // { ok: true, cvId, templateId }
}
export async function getFullCv(cvId) {
  const { data } = await api.get(`/cv/full/${cvId}`);
  return data; // { cvMeta, personal, experiences, education, skills, interests }
}