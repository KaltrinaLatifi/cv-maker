export default function BasicsForm({ value, onChange }) {
  const safe = value || {};

  function setField(key, val) {
    onChange({ ...safe, [key]: val });
  }

  function setLocationField(key, val) {
    const loc = safe.location || {};
    onChange({ ...safe, location: { ...loc, [key]: val } });
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <input
        placeholder="Full name *"
        value={safe.name || ""}
        onChange={(e) => setField("name", e.target.value)}
      />
      <input
        placeholder="Professional title (e.g., Data Analyst)"
        value={safe.label || ""}
        onChange={(e) => setField("label", e.target.value)}
      />
      <input
        placeholder="Email"
        value={safe.email || ""}
        onChange={(e) => setField("email", e.target.value)}
      />
      <input
        placeholder="Phone"
        value={safe.phone || ""}
        onChange={(e) => setField("phone", e.target.value)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="City"
          value={(safe.location && safe.location.city) || ""}
          onChange={(e) => setLocationField("city", e.target.value)}
        />
        <input
          placeholder="Country code (AT, DE, …)"
          value={(safe.location && safe.location.countryCode) || ""}
          onChange={(e) => setLocationField("countryCode", e.target.value.toUpperCase())}
        />
      </div>
      <input
        placeholder="Website (optional)"
        value={safe.website || ""}
        onChange={(e) => setField("website", e.target.value)}
      />
    </div>
  );
}
