// src/templates/Edinburgh/index.jsx
import React from "react";
import { A4, Section, range } from "../base/atoms";
import "./edinburgh.css";

export default function Edinburgh({ resume }) {
  // ✅ Support BOTH shapes:
  const p = resume?.personal || {};
  const b = resume?.basics || {};
  const loc = b.location || {};

  const work = resume?.work || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const interests = resume?.interests || [];

  // ✅ Name
  const name =
    [p.first_name, p.last_name].filter(Boolean).join(" ") ||
    b.name ||
    "Full name";

  // ✅ Objective
  const objective =
    resume?.objective ||
    p.objective ||
    b.summary ||
    b.objective ||
    null;

  // ✅ Contact
  const email = p.email || b.email || "";
  const phone = p.phone_number || b.phone || "";

  // ✅ Address fields
  const addressLine = p.address || loc.address || b.address || "";
  const postalCode = p.zip_code || loc.postalCode || "";
  const city = p.city || loc.city || "";
  const country = loc.countryCode || p.country || "";

  // ✅ Photo URL (support both)
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
  const ORIGIN = API_BASE.replace(/\/api$/, "");

  const rawPhoto = p.photo_url || b.image || "";
  const photoSrc =
    rawPhoto && !String(rawPhoto).startsWith("http")
      ? `${ORIGIN}${rawPhoto}`
      : rawPhoto;

  // =========================
  // ✅ THEME (Auckland-like)
  // =========================
  const theme = resume?._meta?.theme || {};

  // Default Edinburgh purple if nothing is set
  const DEFAULT_PURPLE = "#3d4364";

  // Use accent from theme, but fallback to purple
  const ribbon = theme.accent || DEFAULT_PURPLE;

  // Use rail + border like Auckland presets (fallback to existing defaults)
  const rail = theme.rail || "#f3f4f6";
  const border = theme.border || "#d1d5db";

  // Muted stays calm
  const muted = "#6b7280";

  return (
    <A4
      className="ed-page"
      style={{
        "--ribbon": ribbon,
        "--rail": rail,
        "--rail-border": border,
        "--muted": muted,
      }}
    >
      <div className="ed-layout">
        <aside className="ed-sidebar">
          <div className="ed-sidebar-header">
            <h1 className="ed-name">{name}</h1>
          </div>

          {photoSrc && (
            <div className="ed-photo-wrap">
              <img className="ed-photo" src={photoSrc} alt="Profile" />
            </div>
          )}

          <div className="ed-sidebar-body">
            {(addressLine || postalCode || city || phone || email) && (
              <div className="ed-side-section">
                <h2 className="ed-side-title">Personal</h2>

                <ul className="ed-side-list ed-contact-list">
                  {/* ✅ ADDRESS (only address + ZIP, no city here) */}
                  {(addressLine || postalCode) && (
                    <li>
                      <span className="ed-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M3 11L12 3l9 8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5 10.5V21h5v-6h4v6h5v-10.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="ed-contact-text">
                        <span className="ed-contact-label">Address</span>
                        <span className="ed-contact-value">
                          {[addressLine, postalCodeFix(postalCode)].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                    </li>
                  )}

                  {/* ✅ CITY */}
                  {city && (
                    <li>
                      <span className="ed-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      </span>
                      <div className="ed-contact-text">
                        <span className="ed-contact-label">City</span>
                        <span className="ed-contact-value">
                          {city}
                          {country ? `, ${country}` : ""}
                        </span>
                      </div>
                    </li>
                  )}

                  {/* PHONE */}
                  {phone && (
                    <li>
                      <span className="ed-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M7 2h3l1.5 4.5L9 8.5C10.2 11 12 12.8 14.5 14l2-2.5L21 13v3a3 3 0 0 1-3 3C11.8 19 7 14.2 7 8a3 3 0 0 1 3-3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="ed-contact-text">
                        <span className="ed-contact-label">Phone number</span>
                        <span className="ed-contact-value">{phone}</span>
                      </div>
                    </li>
                  )}

                  {/* EMAIL */}
                  {email && (
                    <li>
                      <span className="ed-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <rect x="3" y="5" width="18" height="14" rx="1.5" ry="1.5" />
                          <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div className="ed-contact-text">
                        <span className="ed-contact-label">Email</span>
                        <span className="ed-contact-value">{email}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {!!interests.length && (
              <div className="ed-side-section">
                <h2 className="ed-side-title">Interests</h2>
                <ul className="ed-side-list ed-interests-list">
                  {interests
                    .map((h) => h?.name || h?.label || h?.hobby || (typeof h === "string" ? h : ""))
                    .filter(Boolean)
                    .map((txt, i) => (
                      <li key={i}>
                        <span className="ed-interest-dot" />
                        <span className="ed-interest-text">{txt}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        <main className="ed-main">
          {objective && (
            <Section title="Resume Objective">
              <p className="ed-summary">{objective}</p>
            </Section>
          )}

          {!!work.length && (
            <Section title="Work experience">
              {work.map((w, i) => (
                <article key={i} className="ed-item">
                  <div className="ed-item-head">
                    <div>
                      <span className="ed-role">{w.position || w.title || "Role"}</span>
                      {(w.company || w.name) && <span className="ed-company"> — {w.company || w.name}</span>}
                    </div>
                    <span className="ed-dates">{range(w.startDate, w.endDate)}</span>
                  </div>
                                   {(w.summary || w.description) && (
  <p className="akl-summary akl-summary--left">
    {w.summary || w.description}
  </p>
)}
                  {!!(w.highlights || []).length && (
                    <ul className="ed-highlights">
                      {(w.highlights || []).map((h, j) => <li key={j}>{h}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </Section>
          )}

          {!!education.length && (
            <Section title="Education and Qualifications">
              {education.map((e, i) => (
                <article key={i} className="ed-item">
                  <div className="ed-item-head">
                    <div>
                      <span className="ed-role">{e.studyType || e.degree || "Degree"}</span>
                      {(e.institution || e.school) && <span className="ed-company"> — {e.institution || e.school}</span>}
                    </div>
                    <span className="ed-dates">{range(e.startDate, e.endDate)}</span>
                  </div>
                  {e.area && <p className="ed-summary">{e.area}</p>}
                </article>
              ))}
            </Section>
          )}

          {!!skills.length && (
            <Section title="Skills">
              <div className="ed-skills">
                {skills.map((s, i) => (
                  <div key={i} className="ed-skill-row">
                    <span className="ed-skill-name">{s.name || s.skill || s.skillName || "Skill"}</span>
                    <span className="ed-skill-dots">{renderDots(s.level)}</span>
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

function postalCodeFix(v) {
  return v ? String(v) : "";
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
    <span key={i} className={`ed-dot ${i < n ? "ed-dot-on" : ""}`} />
  ));
}
