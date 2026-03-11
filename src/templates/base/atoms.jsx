import React from "react";
import "./templateStyles.css";

export function A4({ children, className = "", ...props }) {
  return (
    <div
      {...props} // ✅ allows style, id, data-*, etc.
      className={`cv-a4 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export function Section({ title, children, right }) {
  return (
    <div className="cv-row" style={{ marginTop: "6mm" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2>{title}</h2>
        {right}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function H1({ children }) { return <h1>{children}</h1>; }
export function Muted({ children }) { return <small style={{ color: "var(--muted)" }}>{children}</small>; }

export function Divider({ m = "6mm" }) {
  return <div style={{ borderTop: "1px solid #eee", margin: `${m} 0` }} />;
}

export function range(a, b) {
  const fmt = (iso) => {
    if (!iso) return "Present";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleString(undefined, { month: "short", year: "numeric" });
  };
  const L = fmt(a), R = fmt(b);
  return [L, R].filter(Boolean).join(" – ");
}
