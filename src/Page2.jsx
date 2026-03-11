// src/Page2.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "./api/client";
import { useAuth } from "./AuthContext";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const monthToNum = Object.fromEntries(months.map((m, i) => [m, i + 1]));
const years = Array.from({ length: 50 }, (_, i) => 1980 + i);

function toISO(monthName, year) {
  if (!monthName || !year) return null;
  const m = monthToNum[monthName] ?? 1;
  const mm = String(m).padStart(2, "0");
  return `${year}-${mm}-01T00:00:00Z`;
}
function fromISO(iso) {
  if (!iso) return { month: "", year: "" };
  const d = new Date(iso);
  const month = months[d.getUTCMonth()] || "";
  const year = String(d.getUTCFullYear() || "");
  return { month, year };
}

// validators
const hasExp = (x) =>
  x.jobTitle?.trim() ||
  x.employer?.trim() ||
  x.city?.trim() ||
  (x.startMonth && x.startYear) ||
  (x.endMonth && x.endYear) ||
  x.description?.trim();

const hasEdu = (e) =>
  e.school?.trim() ||
  e.city?.trim() ||
  e.degree?.trim() ||
  e.customDegree?.trim() ||
  (e.startMonth && e.startYear) ||
  (e.endMonth && e.endYear);     // <-- no description any more

const hasSkill = (s) => s.skill?.trim() || s.level?.trim();
const hasHobby = (h) => h.hobby?.trim();

function Page2() {
  const navigate = useNavigate();
  const { cvId: cvIdParam } = useParams();
  const { isAuthenticated, token, loading } = useAuth();

  const cvId = Number(cvIdParam ?? localStorage.getItem("cvId"));
  const draftKey = (id) => `cv_page2_draft_${id}`;

  useEffect(() => {
    if (cvId) localStorage.setItem("cvId", String(cvId));
  }, [cvId]);

  // local state
  const [objective, setObjective] = useState("");
  const [work, setWork] = useState([
    {
      id: null,
      jobTitle: "",
      city: "",
      employer: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      id: null,
      school: "",
      degree: "",
      customDegree: "",
      city: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
  ]);
  const [interests, setInterests] = useState([{ id: null, hobby: "" }]);
  const [skills, setSkills] = useState([{ id: null, skill: "", level: "" }]);

  const [savedExp, setSavedExp] = useState([false]);
  const [savedEdu, setSavedEdu] = useState([false]);
  const [savedInt, setSavedInt] = useState([false]);
  const [savedSkl, setSavedSkl] = useState([false]);
  const [objSaved, setObjSaved] = useState(false);
  const [status, setStatus] = useState("");

  //
  // Guard: if not logged in, bounce back
  //
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !token) {
        navigate("/login?next=create", { replace: true });
      }
    }
  }, [loading, isAuthenticated, token, navigate]);


  // Load Page2 data from DB when user comes back/logs in
  const [loadedFromDb, setLoadedFromDb] = useState(false);

useEffect(() => {
  if (!cvId || loading) return;
  if (!isAuthenticated || !token) return;

  let cancelled = false;

  (async () => {
    try {
      setLoadedFromDb(true);

      setStatus("Loading saved data…");

      // 1) Get personal objective (stored in personaldetails.objective)
      const pRes = await api.get(`/cv/personal/${cvId}`);
      const p = pRes.data;
      if (!cancelled && p?.objective != null) {
        setObjective(p.objective || "");
      }

      // 2) Get experiences
      const expRes = await api.get(`/cv/experience/${cvId}`);
      const exps = Array.isArray(expRes.data) ? expRes.data : [];

      // map DB -> UI shape
      const workUI = exps.length
        ? exps.map((r) => {
            const s = fromISO(r.startDate);
            const e = fromISO(r.endDate);
            return {
              id: r.id,
              jobTitle: r.position || "",
              city: r.city || "",
              employer: r.company || "",
              startMonth: s.month,
              startYear: s.year,
              endMonth: e.month,
              endYear: e.year,
              description: r.description || "",
            };
          })
        : [
            {
              id: null,
              jobTitle: "",
              city: "",
              employer: "",
              startMonth: "",
              startYear: "",
              endMonth: "",
              endYear: "",
              description: "",
            },
          ];

      // 3) Get education
      const eduRes = await api.get(`/cv/education/${cvId}`);
      const edus = Array.isArray(eduRes.data) ? eduRes.data : [];

      const eduUI = edus.length
        ? edus.map((r) => {
            const s = fromISO(r.startDate);
            const e = fromISO(r.endDate);

            // if degree is not in our dropdown, treat as Other
            const allowed = ["High School","Associate","BSc","BA","MSc","MA","PhD","Doctorate","Other"];
            const degreeRaw = (r.degree || "").trim();
            const isKnown = allowed.includes(degreeRaw) && degreeRaw !== "Other";

            return {
              id: r.id,
              school: r.school || "",
              degree: isKnown ? degreeRaw : (degreeRaw ? "Other" : ""),
              customDegree: isKnown ? "" : (degreeRaw && degreeRaw !== "Other" ? degreeRaw : ""),
              city: r.city || "",
              startMonth: s.month,
              startYear: s.year,
              endMonth: e.month,
              endYear: e.year,
            };
          })
        : [
            {
              id: null,
              school: "",
              degree: "",
              customDegree: "",
              city: "",
              startMonth: "",
              startYear: "",
              endMonth: "",
              endYear: "",
            },
          ];

      // 4) Get skills
      const sklRes = await api.get(`/cv/skills/${cvId}`);
      const skls = Array.isArray(sklRes.data) ? sklRes.data : [];
      const sklUI = skls.length
        ? skls.map((r) => ({
            id: r.id,
            skill: r.skillName || "",
            level: r.level || "",
          }))
        : [{ id: null, skill: "", level: "" }];

      // 5) Get interests
      const intRes = await api.get(`/cv/interests/${cvId}`);
      const ints = Array.isArray(intRes.data) ? intRes.data : [];
      const intUI = ints.length
        ? ints.map((r) => ({ id: r.id, hobby: r.hobby || "" }))
        : [{ id: null, hobby: "" }];

      if (cancelled) return;

      setWork(workUI);
      setEducation(eduUI);
      setSkills(sklUI);
      setInterests(intUI);

      // saved flags (if loaded from DB, we can mark as saved)
      setSavedExp(workUI.map((x) => !!x.id));
      setSavedEdu(eduUI.map((x) => !!x.id));
      setSavedSkl(sklUI.map((x) => !!x.id));
      setSavedInt(intUI.map((x) => !!x.id));

      setStatus("");
    } catch (err) {
      console.error("[Page2 load from DB] error", err);
      // if something fails, we keep your localStorage fallback
      setStatus("");
    }
  })();

  return () => {
    cancelled = true;
  };
}, [cvId, isAuthenticated, token, loading]);

  //
  // Rehydrate draft on mount
  //
  useEffect(() => {
    if (!cvId) return;
    if (loadedFromDb) return;
    try {
      const raw = localStorage.getItem(draftKey(cvId));
      if (!raw) return;
      const d = JSON.parse(raw);

      if (typeof d.objective === "string") setObjective(d.objective);
      if (Array.isArray(d.work) && d.work.length) setWork(d.work);
      if (Array.isArray(d.education) && d.education.length)
        setEducation(d.education);
      if (Array.isArray(d.interests) && d.interests.length)
        setInterests(d.interests);
      if (Array.isArray(d.skills) && d.skills.length) setSkills(d.skills);

      if (Array.isArray(d.savedExp)) setSavedExp(d.savedExp);
      if (Array.isArray(d.savedEdu)) setSavedEdu(d.savedEdu);
      if (Array.isArray(d.savedInt)) setSavedInt(d.savedInt);
      if (Array.isArray(d.savedSkl)) setSavedSkl(d.savedSkl);
    } catch {}
  }, [cvId,loadedFromDb]);

  //
  // Autosave draft locally while typing
  //
  useEffect(() => {
    if (!cvId) return;
    const draft = {
      objective,
      work,
      education,
      interests,
      skills,
      savedExp,
      savedEdu,
      savedInt,
      savedSkl,
    };
    localStorage.setItem(draftKey(cvId), JSON.stringify(draft));
  }, [
    cvId,
    objective,
    work,
    education,
    interests,
    skills,
    savedExp,
    savedEdu,
    savedInt,
    savedSkl,
  ]);

  const saveObjective = () => setObjSaved(true);

  // row add / delete / saved flags
  const addExp = () => {
    setWork((w) => [
      ...w,
      {
        id: null,
        jobTitle: "",
        city: "",
        employer: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        description: "",
      },
    ]);
    setSavedExp((s) => [...s, false]);
  };
  const addEdu = () => {
    setEducation((e) => [
      ...e,
      {
        id: null,
        school: "",
        degree: "",
        customDegree: "",
        city: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
      },
    ]);
    setSavedEdu((s) => [...s, false]);
  };
  const addInt = () => {
    setInterests((i) => [...i, { id: null, hobby: "" }]);
    setSavedInt((s) => [...s, false]);
  };
  const addSkl = () => {
    setSkills((s) => [...s, { id: null, skill: "", level: "" }]);
    setSavedSkl((v) => [...v, false]);
  };

  const delRow = async (which, idx) => {
    try {
      if (which === "exp") {
        const row = work[idx];
        if (row?.id) await api.delete(`/cv/experience/${row.id}`);
        setWork((w) => w.filter((_, i) => i !== idx));
        setSavedExp((s) => s.filter((_, i) => i !== idx));
      } else if (which === "edu") {
        const row = education[idx];
        if (row?.id) await api.delete(`/cv/education/${row.id}`);
        setEducation((e) => e.filter((_, i) => i !== idx));
        setSavedEdu((s) => s.filter((_, i) => i !== idx));
      } else if (which === "int") {
        const row = interests[idx];
        if (row?.id) await api.delete(`/cv/interests/${row.id}`);
        setInterests((i) => i.filter((_, n) => n !== idx));
        setSavedInt((s) => s.filter((_, n) => n !== idx));
      } else {
        const row = skills[idx];
        if (row?.id) await api.delete(`/cv/skills/${row.id}`);
        setSkills((s) => s.filter((_, n) => n !== idx));
        setSavedSkl((v) => v.filter((_, n) => n !== idx));
      }
    } catch (err) {
      console.error("[delRow] error", err);
    }
  };

  const markSaved = (which, idx) => {
    if (which === "exp") {
      setSavedExp((s) => s.map((v, i) => (i === idx ? true : v)));
    } else if (which === "edu") {
      setSavedEdu((s) => s.map((v, i) => (i === idx ? true : v)));
    } else if (which === "int") {
      setSavedInt((s) => s.map((v, i) => (i === idx ? true : v)));
    } else {
      setSavedSkl((s) => s.map((v, i) => (i === idx ? true : v)));
    }
  };

  //
  // helper: create or update row depending on .id
  //
  async function upsertRow(item, pathSegment, payload) {
    if (item.id) {
      await api.put(`/cv/${pathSegment}/${item.id}`, payload);
      return item.id;
    } else {
      const res = await api.post(`/cv/${pathSegment}`, payload);
      return res.data?.id ?? null;
    }
  }

  //
  // "Next step" from Page2 → Page3
  //
const handleNext = async (e) => {
  e.preventDefault();
  if (!cvId) return setStatus("Missing CV id");
  if (!isAuthenticated || !token) return alert("You must be logged in.");

  setStatus("Saving…");

  try {
    const pRes = await api.get(`/cv/personal/${cvId}`);
const p = pRes.data || {};

await api.put(`/cv/personal/${cvId}`, {
  cvId,
  first_name: p.first_name || "",
  last_name: p.last_name || "",
  email: p.email || "",
  phone_number: p.phone_number || null,
  address: p.address || null,
  zip_code: p.zip_code || null,
  city: p.city || null,
  photo_url: p.photo_url || null,
  objective,
});

    const nextWork = work.map(x => ({ ...x }));
    const nextEdu = education.map(x => ({ ...x }));
    const nextSkills = skills.map(x => ({ ...x }));
    const nextInterests = interests.map(x => ({ ...x }));

    // 1) Experiences
    for (let i = 0; i < nextWork.length; i++) {
      const x = nextWork[i];
      if (!hasExp(x)) continue;

      const payload = {
        cvId,
        company: x.employer || "",
        position: x.jobTitle || "",
        city: x.city || "",
        startDate: toISO(x.startMonth, x.startYear),
        endDate: toISO(x.endMonth, x.endYear),
        description: x.description || "",
      };

      const id = await upsertRow(x, "experience", payload);
      nextWork[i].id = id; // ✅ update local copy
    }

    // 2) Education
    for (let i = 0; i < nextEdu.length; i++) {
      const ed = nextEdu[i];
      if (!hasEdu(ed)) continue;

      const degreeToSend =
        ed.degree === "Other" ? (ed.customDegree || "Other") : (ed.degree || "");

      const payload = {
        cvId,
        school: ed.school || "",
        degree: degreeToSend,
        city: ed.city || "",
        startDate: toISO(ed.startMonth, ed.startYear),
        endDate: toISO(ed.endMonth, ed.endYear),
      };

      const id = await upsertRow(ed, "education", payload);
      nextEdu[i].id = id;
    }

    // 3) Skills
    for (let i = 0; i < nextSkills.length; i++) {
      const s = nextSkills[i];
      if (!hasSkill(s)) continue;

      const payload = {
        cvId,
        skillName: s.skill || "",
        level: s.level || "",
      };

      const id = await upsertRow(s, "skills", payload);
      nextSkills[i].id = id;
    }

    // 4) Interests
    for (let i = 0; i < nextInterests.length; i++) {
      const h = nextInterests[i];
      if (!hasHobby(h)) continue;

      const payload = { cvId, hobby: h.hobby || "" };

      const id = await upsertRow(h, "interests", payload);
      nextInterests[i].id = id;
    }

    // ✅ Now commit state once
    setWork(nextWork);
    setEducation(nextEdu);
    setSkills(nextSkills);
    setInterests(nextInterests);

    // ✅ IMPORTANT: save draft again WITH ids, before navigate
    localStorage.setItem(
      draftKey(cvId),
      JSON.stringify({
        objective,
        work: nextWork,
        education: nextEdu,
        interests: nextInterests,
        skills: nextSkills,
        savedExp,
        savedEdu,
        savedInt,
        savedSkl,
      })
    );

    setStatus("Saved to database ✅");
    navigate(`/Page3/${cvId}`);
  } catch (err) {
    console.error("[Page2 handleNext] error", err);
    const msg = err.response?.data?.error || err.message || "Save failed";
    setStatus(msg);
    alert(msg);
  }
};


  const monthOptions = useMemo(
    () => [
      <option key="" value=""></option>,
      ...months.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      )),
    ],
    []
  );
  const yearOptions = useMemo(
    () => [
      <option key="" value=""></option>,
      ...years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      )),
    ],
    []
  );

  return (
    <>
      <div className="step-header">
        <h2>My experiences</h2>
        <div className="step-progress">
          <div className="step active">
            <span className="icon">
  <i className="bi bi-person-fill"></i>
</span>
            <span className="label">Personal</span>
          </div>
          <div className="line active-line"></div>
          <div className="step active">
            <span className="icon">📄</span>
            <span className="label">Experiences</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <span className="icon">✏️</span>
            <span className="label">Template</span>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {status && (
          <div className="alert alert-light border" role="alert">
            <strong>Status:</strong> {status}
          </div>
        )}

        {/* Resume Objective */}
        <div className="section-box">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="resume-objective-title">
  <i className="bi bi-person-fill"></i> Resume Objective
</h3>

            {objSaved && <span className="text-success">Saved ✓</span>}
          </div>
          <textarea
            className="form-control"
            placeholder="e.g. A motivated marketing graduate seeking an entry-level role..."
            style={{ minHeight: 120 }}
            value={objective}
            onChange={(e) => {
              setObjective(e.target.value);
              setObjSaved(false);
            }}
          />
          <div className="button-row d-flex gap-2 mt-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={saveObjective}
            >
              💾 Save
            </button>
          </div>
        </div>

        {/* Work Experience */}
        <div className="section-box">
          <div className="d-flex justify-content-between align-items-center">
            <h3>💼 Work Experience</h3>
          </div>

          {work.map((item, i) => (
            <div key={i} className="entry-box">
              {savedExp[i] ? (
                <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.jobTitle || "(No title)"}</strong>
                    <div className="text-muted">
                      {item.startMonth || "—"} {item.startYear || ""} &nbsp;–&nbsp;{" "}
                      {item.endMonth || "—"} {item.endYear || ""}
                    </div>
                    <div className="text-muted">
                      {item.employer || "—"} • {item.city || "—"}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        setSavedExp((s) =>
                          s.map((v, n) => (n === i ? false : v))
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => delRow("exp", i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-row">
                    <input
                      className="form-control"
                      placeholder="Job Title"
                      value={item.jobTitle}
                      onChange={(e) =>
                        setWork((arr) =>
                          arr.map((x, n) =>
                            n === i ? { ...x, jobTitle: e.target.value } : x
                          )
                        )
                      }
                    />
                    <input
                      className="form-control"
                      placeholder="City/Town"
                      value={item.city}
                      onChange={(e) =>
                        setWork((arr) =>
                          arr.map((x, n) =>
                            n === i ? { ...x, city: e.target.value } : x
                          )
                        )
                      }
                    />
                  </div>

                  <input
                    className="form-control"
                    placeholder="Company"
                    value={item.employer}
                    onChange={(e) =>
                      setWork((arr) =>
                        arr.map((x, n) =>
                          n === i ? { ...x, employer: e.target.value } : x
                        )
                      )
                    }
                  />

                  <div className="flex-row">
                    <div className="form-control no-padding">
                      <label>Start Date</label>
                      <div className="flex-row">
                        <select
                          className="form-control"
                          value={item.startMonth}
                          onChange={(e) =>
                            setWork((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, startMonth: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {monthOptions}
                        </select>
                        <select
                          className="form-control"
                          value={item.startYear}
                          onChange={(e) =>
                            setWork((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, startYear: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {yearOptions}
                        </select>
                      </div>
                    </div>

                    <div className="form-control no-padding">
                      <label>End Date</label>
                      <div className="flex-row">
                        <select
                          className="form-control"
                          value={item.endMonth}
                          onChange={(e) =>
                            setWork((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, endMonth: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {monthOptions}
                        </select>
                        <select
                          className="form-control"
                          value={item.endYear}
                          onChange={(e) =>
                            setWork((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, endYear: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {yearOptions}
                        </select>
                      </div>
                    </div>
                  </div>

                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      setWork((arr) =>
                        arr.map((x, n) =>
                          n === i
                            ? { ...x, description: e.target.value }
                            : x
                        )
                      )
                    }
                  />

                  <div className="button-row d-flex gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => delRow("exp", i)}
                    >
                      🗑 Delete
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => markSaved("exp", i)}
                    >
                      💾 Save
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="btn btn-add" onClick={addExp}>
            ➕ Add another work experience
          </div>
        </div>

        {/* Education */}
        <div className="section-box">
          <div className="d-flex justify-content-between align-items-center">
            <h3>🎓 Education and Qualifications</h3>
          </div>

          {education.map((item, i) => (
            <div key={i} className="entry-box">
              {savedEdu[i] ? (
                <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                  <div>
                    <strong>
                      {item.degree === "Other"
                        ? item.customDegree || "Other"
                        : item.degree || "(No degree)"}
                    </strong>
                    <div className="text-muted">
                      {item.startMonth || "—"} {item.startYear || ""} –{" "}
                      {item.endMonth || "—"} {item.endYear || ""}
                    </div>
                    <div className="text-muted">
                      {item.school || "—"} • {item.city || "—"}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        setSavedEdu((s) =>
                          s.map((v, n) => (n === i ? false : v))
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => delRow("edu", i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    className="form-control"
                    placeholder="School / University"
                    value={item.school}
                    onChange={(e) =>
                      setEducation((arr) =>
                        arr.map((x, n) =>
                          n === i ? { ...x, school: e.target.value } : x
                        )
                      )
                    }
                  />

                  <select
                    className="form-control mt-2"
                    value={item.degree}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEducation((arr) =>
                        arr.map((x, n) =>
                          n === i
                            ? {
                                ...x,
                                degree: v,
                                ...(v !== "Other" ? { customDegree: "" } : {}),
                              }
                            : x
                        )
                      );
                    }}
                  >
                    {[
                      "",
                      "High School",
                      "Associate",
                      "BSc",
                      "BA",
                      "MSc",
                      "MA",
                      "PhD",
                      "Doctorate",
                      "Other",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt || "Select Degree"}
                      </option>
                    ))}
                  </select>

                  {item.degree === "Other" && (
                    <input
                      className="form-control mt-2"
                      placeholder="Enter custom degree"
                      value={item.customDegree}
                      onChange={(e) =>
                        setEducation((arr) =>
                          arr.map((x, n) =>
                            n === i
                              ? { ...x, customDegree: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  )}

                  <input
                    className="form-control mt-2"
                    placeholder="City"
                    value={item.city}
                    onChange={(e) =>
                      setEducation((arr) =>
                        arr.map((x, n) =>
                          n === i ? { ...x, city: e.target.value } : x
                        )
                      )
                    }
                  />

                  <div className="flex-row">
                    <div className="form-control no-padding">
                      <label>Start Date</label>
                      <div className="flex-row">
                        <select
                          className="form-control"
                          value={item.startMonth}
                          onChange={(e) =>
                            setEducation((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, startMonth: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {monthOptions}
                        </select>
                        <select
                          className="form-control"
                          value={item.startYear}
                          onChange={(e) =>
                            setEducation((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, startYear: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {yearOptions}
                        </select>
                      </div>
                    </div>

                    <div className="form-control no-padding">
                      <label>End Date</label>
                      <div className="flex-row">
                        <select
                          className="form-control"
                          value={item.endMonth}
                          onChange={(e) =>
                            setEducation((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, endMonth: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {monthOptions}
                        </select>
                        <select
                          className="form-control"
                          value={item.endYear}
                          onChange={(e) =>
                            setEducation((arr) =>
                              arr.map((x, n) =>
                                n === i
                                  ? { ...x, endYear: e.target.value }
                                  : x
                              )
                            )
                          }
                        >
                          {yearOptions}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="button-row d-flex gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => delRow("edu", i)}
                    >
                      🗑 Delete
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => markSaved("edu", i)}
                    >
                      💾 Save
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="btn btn-add" onClick={addEdu}>
            ➕ Add another education
          </div>
        </div>

        {/* Interests */}
        <div className="section-box">
          <h3>🎨 Interests</h3>

          {interests.map((item, i) => (
            <div key={i} className="entry-box">
              {savedInt[i] ? (
                <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.hobby || "(No hobby)"}</strong>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        setSavedInt((s) =>
                          s.map((v, n) => (n === i ? false : v))
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => delRow("int", i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    className="form-control"
                    placeholder="e.g. Hiking, Photography"
                    value={item.hobby}
                    onChange={(e) =>
                      setInterests((arr) =>
                        arr.map((x, n) =>
                          n === i ? { ...x, hobby: e.target.value } : x
                        )
                      )
                    }
                  />
                  <div className="button-row d-flex gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => delRow("int", i)}
                    >
                      🗑 Delete
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => markSaved("int", i)}
                    >
                      💾 Save
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="btn btn-add" onClick={addInt}>
            ➕ Add another hobby
          </div>
        </div>

        {/* Skills */}
        <div className="section-box">
          <h3>🛠 Skills</h3>

          {skills.map((item, i) => (
            <div key={i} className="entry-box">
              {savedSkl[i] ? (
                <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.skill || "(No skill)"}</strong> —{" "}
                    {item.level || "Unspecified"}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() =>
                        setSavedSkl((s) =>
                          s.map((v, n) => (n === i ? false : v))
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => delRow("skl", i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    className="form-control"
                    placeholder="Skill (e.g. JavaScript)"
                    value={item.skill}
                    onChange={(e) =>
                      setSkills((arr) =>
                        arr.map((x, n) =>
                          n === i ? { ...x, skill: e.target.value } : x
                        )
                      )
                    }
                  />
                  <select
                    className="form-control mt-2"
                    value={item.level}
                    onChange={(e) =>
                      setSkills((arr) =>
                        arr.map((x, n) =>
                          n === i ? { ...x, level: e.target.value } : x
                        )
                      )
                    }
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>

                  <div className="button-row d-flex gap-2 mt-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => delRow("skl", i)}
                    >
                      🗑 Delete
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => markSaved("skl", i)}
                    >
                      💾 Save
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="btn btn-add" onClick={addSkl}>
            ➕ Add another skill
          </div>
        </div>

        {/* Nav */}
        <div className="step-navigation mt-4 d-flex justify-content-between">
          <button
            className="step-btn prev"
            onClick={() => navigate(`/cvform/${cvId}`)}
          >
            ◀ Previous step
          </button>
          <button className="step-btn next" onClick={handleNext}>
            Next step ▶
          </button>
        </div>
      </div>
    </>
  );
}

export default Page2;
