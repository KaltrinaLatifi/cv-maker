// src/draft/migrateDraftsToResume.js
import { api } from "../api/client";
import { getResume, updateResume } from "../api/resumes";

/** Normalize text to build stable dedupe keys */
function norm(v) {
  return String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** Dedupe by computed signature (content), NOT by id */
function dedupeBy(arr, keyFn) {
  const out = [];
  const seen = new Set();
  for (const item of arr || []) {
    const key = keyFn(item);
    if (!key) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export async function migrateDraftsToResume(resumeId, cvId) {
  if (!resumeId || !cvId) return;

  // Load existing resume row (so we keep anything already stored)
  const row = await getResume(resumeId);

  const current =
    typeof row?.data_json === "string"
      ? JSON.parse(row.data_json || "{}")
      : row?.data_json || {};

  // Fetch wizard data from normalized tables
  const [personalRes, expRes, eduRes, skillsRes, interestsRes] =
    await Promise.all([
      api.get(`/cv/personal/${cvId}`).catch(() => ({ data: null })),
      api.get(`/cv/experience/${cvId}`).catch(() => ({ data: [] })),
      api.get(`/cv/education/${cvId}`).catch(() => ({ data: [] })),
      api.get(`/cv/skills/${cvId}`).catch(() => ({ data: [] })),
      api.get(`/cv/interests/${cvId}`).catch(() => ({ data: [] })),
    ]);

  const personal = personalRes?.data || null;

  const experiences = Array.isArray(expRes?.data) ? expRes.data : [];
  const education = Array.isArray(eduRes?.data) ? eduRes.data : [];
  const skills = Array.isArray(skillsRes?.data) ? skillsRes.data : [];
  const interests = Array.isArray(interestsRes?.data) ? interestsRes.data : [];

  // Map DB experience rows -> resume.work format your template expects
  const mappedWorkRaw = experiences.map((x) => ({
    id: x.id,
    position: x.job_title || x.position || x.title || "",
    company: x.company || x.employer || "",
    location: x.location || x.city || "",
    startDate: x.start_date || x.startDate || "",
    endDate: x.end_date || x.endDate || "",
    summary: x.description || x.summary || "",
    highlights: Array.isArray(x.highlights) ? x.highlights : [],
  }));

  // Dedupe work by “same job” signature
  const mappedWork = dedupeBy(mappedWorkRaw, (w) =>
    [
      norm(w.position),
      norm(w.company),
      norm(w.location),
      norm(w.startDate),
      norm(w.endDate),
      norm(w.summary),
    ].join("|")
  );

  const mappedEducationRaw = education.map((e) => ({
    id: e.id,
    institution: e.school || e.institution || "",
    studyType: e.degree || e.studyType || "",
    area: e.field || e.area || "",
    startDate: e.start_date || e.startDate || "",
    endDate: e.end_date || e.endDate || "",
  }));

  const mappedEducation = dedupeBy(mappedEducationRaw, (e) =>
    [
      norm(e.institution),
      norm(e.studyType),
      norm(e.area),
      norm(e.startDate),
      norm(e.endDate),
    ].join("|")
  );

  const mappedSkillsRaw = skills.map((s) => ({
    id: s.id,
    name: s.skill_name || s.name || s.skill || "",
    level: s.level || s.fluency || "",
  }));

  // Dedupe skills by name+level (case-insensitive)
  const mappedSkills = dedupeBy(mappedSkillsRaw, (s) =>
    [norm(s.name), norm(s.level)].join("|")
  );

  const mappedInterestsRaw = interests.map((i) => ({
    id: i.id,
    name: i.name || i.interest || i.hobby || "",
  }));

  // Dedupe interests by name
  const mappedInterests = dedupeBy(mappedInterestsRaw, (i) => norm(i.name));

  // Build new dataJson (IMPORTANT: replace arrays)
  const nextDataJson = {
    ...current,

    personal: personal
      ? {
          ...(current.personal || {}),
          ...personal,
        }
      : current.personal || {},

    // replace instead of append
    work: mappedWork,
    education: mappedEducation,
    skills: mappedSkills,
    interests: mappedInterests,

    // keep meta (useful to track source cvId)
    _meta: {
      ...((current._meta || {})),
      cvId: Number(cvId),
    },
  };

  await updateResume(Number(resumeId), {
    dataJson: nextDataJson,
  });

  return true;
}
