//src\api\wizardAdapter.js
import { api } from "./client";
import { createResume, getResume } from "./resumes";

// Resolve a resume by your old cvId (we store it as title). If missing, create it.
export async function ensureResumeByTitle(cvId) {
  try {
    const { data } = await api.get(`/resumes/by-title/${encodeURIComponent(cvId)}`);
    return data;                             // found
  } catch {
    const { id } = await createResume({      // create
      title: String(cvId),
      dataJson: { basics: {}, work: [], education: [], skills: [] },
      schemaVersion: 1
    });
    return await getResume(id);
  }
}

// Patch only a section (safe for wizard pages)
export async function patchResumeSection(resumeId, patchObj) {
  await api.patch(`/resumes/${resumeId}`, { patch: patchObj });
}
