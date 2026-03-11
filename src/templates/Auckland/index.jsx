// templates/Auckland/index.jsx
import React from "react";
import { A4, Section, range } from "../base/atoms";
import "./auckland.css";

export default function Auckland({ resume }) {
  const p = resume?.personal || {};
  const b = resume?.basics || {};
  const loc = b.location || {};

  const name =
    [p.first_name, p.last_name].filter(Boolean).join(" ") ||
    b.name ||
    "Your Name";

  const email = p.email || b.email || "";
  const phone = p.phone_number || b.phone || "";

  const objective = resume?.objective || p.objective || b.label || "";

  const addressLine = p.address || b.address || loc.address || "";
  const zipLine = p.zip_code || loc.postalCode || "";
  const cityLine = p.city || loc.city || "";
  const countryLine = loc.countryCode || "";

  const addressText = [addressLine, zipLine].filter(Boolean).join(" · ");
  const cityText = [cityLine, countryLine].filter(Boolean).join(", ");

  // Photo
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
  const ORIGIN = API_BASE.replace(/\/api$/, "");

  const rawPhoto = p.photo_url || b.image || "";
  const photoSrc =
    rawPhoto && !String(rawPhoto).startsWith("http")
      ? `${ORIGIN}${rawPhoto}`
      : rawPhoto;

  const work = resume?.work || [];
  const education = resume?.education || [];
  const interests = resume?.interests || [];
  const skills = resume?.skills || [];

  // Theme (dynamic colors)
  const theme = resume?._meta?.theme || {};
  const accent = theme.accent || "#111111";
  const rail = theme.rail || "#f2f3f7";
  const border = theme.border || "#dde0e6";

  return (
    <A4
      className="akl-page"
      style={{
        "--accent": accent,
        "--rail": rail,
        "--rail-border": border,
      }}
    >
      {/* NAME RIBBON */}
      <header className="akl-header">
        <div className="akl-name-box">
          <h1 className="akl-name">{name}</h1>
        </div>
      </header>

      {/* TWO-COLUMN LAYOUT */}
      <div className="akl-layout">
        {/* LEFT RAIL */}
        <aside className="akl-rail">
          <div className="akl-block">
            {photoSrc && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0 14px",
                }}
              >
                <img
                  src={photoSrc}
                  alt="Profile"
                  style={{
                    width: 92,
                    height: 92,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </div>
            )}

            <div className="akl-rail-title">PERSONAL</div>
            <div className="akl-personal">
              {name && (
                <div className="akl-field">
                  <div className="akl-label">Name</div>
                  <div className="akl-value">{name}</div>
                </div>
              )}

              {addressText && (
                <div className="akl-field">
                  <div className="akl-label">Address</div>
                  <div className="akl-value">{addressText}</div>
                </div>
              )}

              {cityText && (
                <div className="akl-field">
                  <div className="akl-label">City</div>
                  <div className="akl-value">{cityText}</div>
                </div>
              )}

              {phone && (
                <div className="akl-field">
                  <div className="akl-label">Phone number</div>
                  <div className="akl-value">{phone}</div>
                </div>
              )}

              {email && (
                <div className="akl-field">
                  <div className="akl-label">Email</div>
                  <div className="akl-value">{email}</div>
                </div>
              )}
            </div>
          </div>

          {!!interests.length && (
            <div className="akl-block">
              <div className="akl-rail-title">INTERESTS</div>
              <ul className="akl-interests">
                {interests.map((h, i) => {
                  const label =
                    h?.name ||
                    h?.hobby ||
                    h?.label ||
                    (typeof h === "string" ? h : "");
                  if (!label) return null;
                  return <li key={i}>{label}</li>;
                })}
              </ul>
            </div>
          )}

          {!!resume?.languages?.length && (
            <div className="akl-block">
              <div className="akl-rail-title">LANGUAGES</div>
              <div className="d-flex flex-column gap-1 small">
                {resume.languages.map((lang, i) => (
                  <div key={i} className="d-flex align-items-center">
                    <div className="me-auto">{lang.language || lang.name}</div>
                    <div className="d-flex gap-1">{renderDots(lang.fluency)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="akl-content">
          {objective && (
            <Section title="RESUME OBJECTIVE">
              <p className="akl-objective" style={{ textAlign: "left" }}>
                {objective}
              </p>
            </Section>
          )}

          {!!work.length && (
            <Section title="WORK EXPERIENCE">
              {work.map((w, i) => (
                <article key={i} className="akl-item">
                  <div className="akl-item-header">
                    <div>
                      <span className="akl-role">
                        {w.position || w.title || "Role"}
                      </span>
                      {(w.company || w.name) && (
                        <span className="akl-company">
                          {" "}
                          — {w.company || w.name}
                        </span>
                      )}
                    </div>
                    <span className="akl-dates">{range(w.startDate, w.endDate)}</span>
                  </div>

                 {(w.summary || w.description) && (
  <p className="akl-summary akl-summary--left">
    {w.summary || w.description}
  </p>
)}



                  {!!(w.highlights || []).length && (
                    <ul className="akl-highlights">
                      {(w.highlights || []).map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                  )}

                  <div className="akl-hr" />
                </article>
              ))}
            </Section>
          )}

          {!!education.length && (
            <Section title="EDUCATION AND QUALIFICATIONS">
              {education.map((e, i) => (
                <article key={i} className="akl-item">
                  <div className="akl-item-header">
                    <div>
                      <span className="akl-role">
                        {e.studyType || e.degree || "Degree"}
                      </span>
                      {(e.institution || e.school) && (
                        <span className="akl-company">
                          {" "}
                          — {e.institution || e.school}
                        </span>
                      )}
                    </div>
                    <span className="akl-dates">{range(e.startDate, e.endDate)}</span>
                  </div>

                  {e.area && <p className="akl-summary">{e.area}</p>}

                  <div className="akl-hr" />
                </article>
              ))}
            </Section>
          )}

          {!!skills.length && (
            <Section title="SKILLS">
              <div className="akl-skills">
                {skills.map((s, i) => (
                  <div key={i} className="akl-skill-row">
                    <span className="akl-skill-name">
                      {s.name || s.skill || s.skillName || "Skill"}
                    </span>
                    <span className="akl-dots">{renderDots(s.level)}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {!!resume?.references?.length && (
            <Section title="REFERENCES">
              {resume.references.map((ref, i) => (
                <div key={i} className="akl-item">
                  <div className="fw-semibold">{ref.name}</div>
                  {ref.phone && <div className="small">{ref.phone}</div>}
                  {ref.email && <div className="small">{ref.email}</div>}
                </div>
              ))}
            </Section>
          )}
        </main>
      </div>
    </A4>
  );
}

/** 5-dot indicator */
function renderDots(level) {
  const to5 = (v) => {
    if (!v) return 0;
    const t = String(v).toLowerCase();

    if (/^\d+$/.test(t)) return Math.max(0, Math.min(5, Number(t)));
    if (t.endsWith("%"))
      return Math.round(Math.min(100, Number(t.slice(0, -1))) / 20);
    if (t.includes("expert")) return 5;
    if (t.includes("adv")) return 4;
    if (t.includes("inter")) return 3;
    if (t.includes("basic")) return 2;
    return 0;
  };

  const n = to5(level);
  return Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className={`akl-dot ${i < n ? "akl-dot-on" : ""}`} />
  ));
}
