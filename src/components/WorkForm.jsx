import { useState } from "react";

export default function WorkForm({ value, onChange }) {
  const [draft, setDraft] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    summary: "",
    highlights: []
  });

  function addItem() {
    if (!draft.company || !draft.position || !draft.startDate) {
      return alert("Company, position and start date are required");
    }
    onChange([
      ...value,
      {
        ...draft,
        endDate: draft.endDate || undefined
      }
    ]);
    setDraft({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      summary: "",
      highlights: []
    });
  }

  function updateItem(idx, patch) {
    const next = value.slice();
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }

  function removeItem(idx) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h3>Add a job</h3>
      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
        <input
          placeholder="Company *"
          value={draft.company}
          onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))}
        />
        <input
          placeholder="Position *"
          value={draft.position}
          onChange={(e) => setDraft((d) => ({ ...d, position: e.target.value }))}
        />
        <input
          placeholder="Start (YYYY-MM) *"
          value={draft.startDate}
          onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))}
        />
        <input
          placeholder="End (YYYY-MM or empty for Present)"
          value={draft.endDate}
          onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))}
        />
      </div>
      <textarea
        placeholder="Summary (one line)"
        value={draft.summary}
        onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))}
      />
      <HighlightEditor
        highlights={draft.highlights || []}
        onAdd={(txt) =>
          setDraft((d) => ({ ...d, highlights: [...(d.highlights || []), txt.trim()] }))
        }
        onRemove={(i) =>
          setDraft((d) => ({
            ...d,
            highlights: (d.highlights || []).filter((_, idx) => idx !== i)
          }))
        }
      />
      <button onClick={addItem}>Add Job</button>

      <h3>Current jobs</h3>
      {(!value || value.length === 0) && <p>No jobs yet.</p>}
      {value.map((w, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
            <input value={w.company || ""} onChange={(e) => updateItem(i, { company: e.target.value })} />
            <input value={w.position || ""} onChange={(e) => updateItem(i, { position: e.target.value })} />
            <input value={w.startDate || ""} onChange={(e) => updateItem(i, { startDate: e.target.value })} />
            <input value={w.endDate || ""} onChange={(e) => updateItem(i, { endDate: e.target.value || undefined })} />
          </div>
          <textarea value={w.summary || ""} onChange={(e) => updateItem(i, { summary: e.target.value })} />
          <HighlightEditor
            highlights={w.highlights || []}
            onAdd={(txt) => updateItem(i, { highlights: [...(w.highlights || []), txt.trim()] })}
            onRemove={(idx) =>
              updateItem(i, { highlights: (w.highlights || []).filter((_, j) => j !== idx) })
            }
          />
          <button onClick={() => removeItem(i)} style={{ marginTop: 8 }}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function HighlightEditor({ highlights, onAdd, onRemove }) {
  const [text, setText] = useState("");
  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="Achievement bullet"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            if (text.trim()) onAdd(text);
            setText("");
          }}
        >
          Add bullet
        </button>
      </div>
      <ul>
        {highlights.map((h, i) => (
          <li key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ flex: 1 }}>{h}</span>
            <button onClick={() => onRemove(i)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
