/*src\templates\base\BaseTemplate.jsx*/
import React from "react";
import { A4 } from "../base/atoms";

export default function BaseTemplate({ resume }) {
  const b = resume?.basics || {};
  const loc = b.location || {};
  const work = resume?.work || [];

  return (
    <A4>
      <div style={styles.inner}>
        <header style={styles.header}>
          <h1 style={styles.name}>{b.name || "Full Name"}</h1>
          <p style={styles.meta}>
            {b.label ? b.label + " · " : ""}
            {b.email ? b.email + " · " : ""}
            {b.phone ? b.phone + " · " : ""}
            {loc.city || ""}
            {loc.countryCode
              ? (loc.city ? ", " : "") + loc.countryCode
              : ""}
          </p>
        </header>

        {work.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.h2}>Experience</h2>
            {work.map((w, i) => (
              <article key={i} style={styles.item}>
                <div style={styles.itemHeader}>
                  <strong>{w.position}</strong>{" "}
                  <span style={{ color: "#666" }}>— {w.company}</span>
                  <span style={styles.dates}>
                    {(w.startDate || "").replace("-", "/")} –{" "}
                    {w.endDate
                      ? w.endDate.replace("-", "/")
                      : "Present"}
                  </span>
                </div>
                {w.summary && (
                  <p style={styles.summary}>{w.summary}</p>
                )}
                {!!(w.highlights || []).length && (
                  <ul style={styles.ul}>
                    {w.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </A4>
  );
}

const styles = {
  
  inner: { boxSizing: "border-box", background: "white", color: "#111" },
  header: { marginBottom: "8mm" },
  name: { fontSize: 28, margin: 0 },
  meta: { margin: "6px 0 0 0", color: "#555" },
  section: { marginTop: "6mm" },
  h2: {
    fontSize: 16,
    borderBottom: "2px solid #163679",
    paddingBottom: 4,
    marginBottom: 8,
  },
  item: { breakInside: "avoid", marginBottom: 10 },
  itemHeader: {
    display: "flex",
    gap: 8,
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  dates: { marginLeft: "auto", color: "#666", fontSize: 12 },
  summary: { margin: "4px 0" },
  ul: { margin: "4px 0 0 18px" },
};
