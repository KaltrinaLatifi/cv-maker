// src/templates/Stanford/index.jsx
import React from "react";
import { A4, Section, range } from "../base/atoms";
import "./stanford.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
const ORIGIN = API_BASE.replace(/\/api$/, "");

function photoSrc(image) {
  if (!image) return "";
  const s = String(image).trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/")) return `${ORIGIN}${s}`;
  return s;
}

export default function Stanford({ resume }) {
  const p = resume?.personal || {};
  const b = resume?.basics || {};
  const loc = b.location || {};

  const work = resume?.work || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const interests = resume?.interests || [];

  const fullName =
    [p.first_name, p.last_name].filter(Boolean).join(" ") ||
    b.name ||
    "Full name";

  const phone = p.phone_number || b.phone || "";
  const email = p.email || b.email || "";

  const addressLine = p.address || loc.address || b.address || "";
  const postalCode = p.zip_code || loc.postalCode || "";
  const city = p.city || loc.city || "";

  const addressValue = [addressLine, postalCode].filter(Boolean).join(" · ");
  const cityValue = city || "";

  const img = photoSrc(p.photo_url || b.image);

  const hasSide = Boolean(fullName || addressValue || cityValue || phone || email);

  const objective =
    resume?.objective || p.objective || b.summary || b.objective || null;

  // ✅ Auckland theme support
  const theme = resume?._meta?.theme || {};
  const left = theme.accent || "#323843";         // sidebar + active dots
  const muted = theme.muted || "#6b7280";
  const border = theme.border || "#e5e7eb";

  return (
    <A4
      className="st-page"
      style={{
        "--left": left,
        "--muted": muted,
        "--border": border,
      }}
    >
      <div className="st-layout">
        {/* LEFT SIDEBAR */}
        <aside className="st-left">
          {img && (
            <div className="st-photo-wrap">
              <img className="st-photo" src={img} alt="Profile" />
            </div>
          )}

          <div className="st-left-body">
            {hasSide && (
              <div className="st-side-section">
                <h2 className="st-side-title">Personal</h2>

                <ul className="st-side-list st-contact-list">
                  {fullName && (
                    <li>
                      <span className="st-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 21a8 8 0 1 0-16 0" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="st-contact-text">
                        <span className="st-contact-label">Name</span>
                        <span className="st-contact-value">{fullName}</span>
                      </div>
                    </li>
                  )}

                  {addressValue && (
                    <li>
                      <span className="st-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M3 11L12 3l9 8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5 10.5V21h5v-6h4v6h5v-10.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="st-contact-text">
                        <span className="st-contact-label">Address</span>
                        <span className="st-contact-value">{addressValue}</span>
                      </div>
                    </li>
                  )}

                  {cityValue && (
                    <li>
                      <span className="st-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="st-contact-text">
                        <span className="st-contact-label">City</span>
                        <span className="st-contact-value">{cityValue}</span>
                      </div>
                    </li>
                  )}

                  {phone && (
                    <li>
                      <span className="st-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M7 2h3l1.5 4.5L9 8.5C10.2 11 12 12.8 14.5 14l2-2.5L21 13v3a3 3 0 0 1-3 3C11.8 19 7 14.2 7 8a3 3 0 0 1 3-3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="st-contact-text">
                        <span className="st-contact-label">Phone number</span>
                        <span className="st-contact-value">{phone}</span>
                      </div>
                    </li>
                  )}

                  {email && (
                    <li>
                      <span className="st-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <rect x="3" y="5" width="18" height="14" rx="1.5" ry="1.5" />
                          <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="st-contact-text">
                        <span className="st-contact-label">Email</span>
                        <span className="st-contact-value">{email}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {!!interests.length && (
              <div className="st-side-section">
                <h2 className="st-side-title">Interests</h2>
                <ul className="st-side-list st-interests-list">
                  {interests
                    .map((h) => h?.name || h?.label || h?.hobby || (typeof h === "string" ? h : ""))
                    .filter(Boolean)
                    .map((txt, i) => (
                      <li key={i}>
                        <span className="st-interest-dot" />
                        <span className="st-interest-text">{txt}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT MAIN */}
        <main className="st-main">
          <header className="st-header">
            <h1 className="st-name">{fullName}</h1>
            <div className="st-top-rule" />
          </header>

{objective && (
  <Section title="Resume objective">
    <p className="st-summary st-summary--left">{objective}</p>
  </Section>
)}



          {!!work.length && (
            <Section title="Work experience">
              {work.map((w, i) => (
                <article key={i} className="st-item">
                  <div className="st-item-head">
                    <div>
                      <span className="st-role">{w.position || w.title || "Role"}</span>
                      {(w.company || w.name) && (
                        <span className="st-company"> — {w.company || w.name}</span>
                      )}
                    </div>
                    <span className="st-dates">{range(w.startDate, w.endDate)}</span>
                  </div>
                  {(w.summary || w.description) && (
  <p className="st-summary">
    {w.summary || w.description}
  </p>
)}
                  {!!(w.highlights || []).length && (
                    <ul className="st-highlights">
                      {w.highlights.map((h, j) => <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </Section>
          )}

          {!!education.length && (
            <Section title="Education and qualifications">
              {education.map((e, i) => (
                <article key={i} className="st-item">
                  <div className="st-item-head">
                    <div>
                      <span className="st-role">{e.studyType || e.degree || "Degree"}</span>
                      {(e.institution || e.school) && (
                        <span className="st-company"> — {e.institution || e.school}</span>
                      )}
                    </div>
                    <span className="st-dates">{range(e.startDate, e.endDate)}</span>
                  </div>
                  {e.area && <p className="st-summary">{e.area}</p>}
                </article>
              ))}
            </Section>
          )}

          {!!skills.length && (
            <Section title="Skills">
              <div className="st-skills">
                {skills.map((s, i) => (
                  <div key={i} className="st-skill-row">
                    <span className="st-skill-name">
                      {s.name || s.skill || s.skillName || "Skill"}
                    </span>
                    <span className="st-skill-dots">{renderDots(s.level)}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </A4>
  );
}

function renderDots(level) {
  const to5 = (v) => {
    if (!v) return 0;
    const t = String(v).toLowerCase();
    if (/^\d+$/.test(t)) return Math.max(0, Math.min(5, Number(t)));
    if (t.endsWith("%")) return Math.round(Math.min(100, Number(t.slice(0, -1))) / 20);
    if (t.includes("expert")) return 5;
    if (t.includes("adv")) return 4;
    if (t.includes("inter")) return 3;
    if (t.includes("basic")) return 2;
    return 0;
  };

  const n = to5(level);
  return Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className={`st-dot ${i < n ? "st-dot-on" : ""}`} />
  ));
}
