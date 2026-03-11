import { useEffect, useMemo, useState } from "react";
import { createResume, getResume, updateResume } from "../../api/resumes";
import BasicsForm from "./BasicsForm";
import WorkForm from "./WorkForm";
import { emptyResume } from "../../types/resume";
// a simple empty model
const emptyResume = {
  basics: {
    name: "",
    email: "",
    phone: "",
    website: "",
    label: "",
    location: { city: "", countryCode: "" }
  },
  work: [],
  education: [],
  skills: []
};

export default function ResumeEditor({ resumeId }) {
  const [data, setData] = useState(emptyResume);
  const [title, setTitle] = useState("My Resume");
  const [templateId, setTemplateId] = useState(null);
  const [loading, setLoading] = useState(!!resumeId);
  const [activeTab, setActiveTab] = useState("basics"); // "basics" | "work"

  useEffect(() => {
    if (!resumeId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getResume(resumeId);
        setData(res.data_json || emptyResume);
        setTitle(res.title || "My Resume");
        setTemplateId(res.template_id ?? null);
      } catch (e) {
        console.error(e);
        alert("Failed to load resume");
      } finally {
        setLoading(false);
      }
    })();
  }, [resumeId]);

  const canSave = useMemo(() => (data.basics?.name || "").trim().length > 0, [data]);

  async function handleSave() {
    try {
      if (!canSave) return alert("Please enter at least your name");
      if (resumeId) {
        await updateResume(resumeId, {
          title,
          templateId,
          dataJson: data,
          schemaVersion: 1
        });
        alert("Saved!");
      } else {
        const { id } = await createResume({
          title,
          templateId,
          dataJson: data,
          schemaVersion: 1
        });
        alert("Created!");
        // redirect to /edit/:id (adjust to your router)
        window.location.href = `/edit/${id}`;
      }
    } catch (e) {
      console.error(e);
      alert("Save failed");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Resume Editor</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (for you)"
          style={{ flex: 1 }}
        />
        <select
          value={templateId ?? ""}
          onChange={(e) => setTemplateId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Choose Template</option>
          <option value="1">Clean</option>
          {/* later: fetch real templates list */}
        </select>
        <button onClick={handleSave} disabled={!canSave || loading}>
          {resumeId ? "Save" : "Create"}
        </button>
      </div>

      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setActiveTab("basics")} disabled={activeTab === "basics"}>
          Basics
        </button>
        <button onClick={() => setActiveTab("work")} disabled={activeTab === "work"}>
          Work
        </button>
      </nav>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          {activeTab === "basics" && (
            <BasicsForm
              value={data.basics}
              onChange={(basics) => setData((d) => ({ ...d, basics }))}
            />
          )}
          {activeTab === "work" && (
            <WorkForm value={data.work} onChange={(work) => setData((d) => ({ ...d, work }))} />
          )}
        </>
      )}
    </div>
  );
}
