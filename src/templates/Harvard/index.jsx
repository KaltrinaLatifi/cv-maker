// src/templates/Harvard/index.jsx
import React from "react";
import { A4, Section, range } from "../base/atoms";
import "./harvard.css";

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


function TimelineSection({ title, icon, children, last = false }) {
  return (
    <div className={`hv-tl ${last ? "hv-tl--last" : ""}`}>
      <div className="hv-tl-left">
        <div className="hv-tl-icon">{icon}</div>
        <div className="hv-tl-line" />
      </div>

      <div className="hv-tl-right">
        <Section title={title}>{children}</Section>
      </div>
    </div>
  );
}

export default function Harvard({ resume }) {

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


  const addressLine = p.address || b.address || loc.address || "";
  const postalCode = p.zip_code || loc.postalCode || "";
  const city = p.city || loc.city || "";

  const addressValue = [addressLine, postalCode].filter(Boolean).join(" · ");
  const cityValue = city || "";

  const img = photoSrc(p.photo_url || b.image);

  const hasPersonal = Boolean(fullName || addressValue || cityValue || phone || email);

  const objective = resume?.objective || p.objective || b.summary || b.objective || "";

 
  const theme = resume?._meta?.theme || {};
  const accent = theme.accent || "#315a8a";   // sidebar
  const rail = theme.rail || "#f2f3f7";       // optional light color
  const border = theme.border || "#dde0e6";   // separators

  return (
    <A4
      className="hv-page"
      style={{
        "--accent": accent,
        "--rail": rail,
        "--border": border,
      }}
    >
      <div className="hv-layout">
        {/* LEFT SIDEBAR */}
        <aside className="hv-left">
          {img && (
            <div className="hv-photo-wrap">
              <img className="hv-photo" src={img} alt="Profile" />
            </div>
          )}

          <div className="hv-left-body">
            {hasPersonal && (
              <div className="hv-side-section">
                <h2 className="hv-side-title">PERSONAL</h2>

                <ul className="hv-side-list hv-contact-list">
                  {fullName && (
                    <li>
                      <span className="hv-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M20 21a8 8 0 0 0-16 0" />
                          <circle cx="12" cy="8" r="4" />
                        </svg>
                      </span>
                      <div className="hv-contact-text">
                        <span className="hv-contact-label">Name</span>
                        <span className="hv-contact-value">{fullName}</span>
                      </div>
                    </li>
                  )}

                  {addressValue && (
                    <li>
                      <span className="hv-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M3 11L12 3l9 8" />
                          <path d="M5 10.5V21h5v-6h4v6h5v-10.5" />
                        </svg>
                      </span>
                      <div className="hv-contact-text">
                        <span className="hv-contact-label">Address</span>
                        <span className="hv-contact-value">{addressValue}</span>
                      </div>
                    </li>
                  )}

                  {cityValue && (
                    <li>
                      <span className="hv-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
                          <path d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                      </span>
                      <div className="hv-contact-text">
                        <span className="hv-contact-label">City</span>
                        <span className="hv-contact-value">{cityValue}</span>
                      </div>
                    </li>
                  )}

                  {phone && (
                    <li>
                      <span className="hv-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M7 2h3l1.5 4.5L9 8.5C10.2 11 12 12.8 14.5 14l2-2.5L21 13v3a3 3 0 0 1-3 3C11.8 19 7 14.2 7 8a3 3 0 0 1 3-3" />
                        </svg>
                      </span>
                      <div className="hv-contact-text">
                        <span className="hv-contact-label">Phone number</span>
                        <span className="hv-contact-value">{phone}</span>
                      </div>
                    </li>
                  )}

                  {email && (
                    <li>
                      <span className="hv-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <rect x="3" y="5" width="18" height="14" rx="1.5" ry="1.5" />
                          <path d="M4 7l8 6 8-6" />
                        </svg>
                      </span>
                      <div className="hv-contact-text">
                        <span className="hv-contact-label">Email</span>
                        <span className="hv-contact-value">{email}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {!!interests.length && (
              <div className="hv-side-section">
                <h2 className="hv-side-title">INTERESTS</h2>
                <ul className="hv-side-list hv-interests-list">
                  {interests
                    .map((h) => h?.name || h?.label || h?.hobby || (typeof h === "string" ? h : ""))
                    .filter(Boolean)
                    .map((txt, i) => (
                      <li key={i}>
                        <span className="hv-interest-dot" />
                        <span className="hv-interest-text">{txt}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT MAIN */}
        <main className="hv-main">
          <header className="hv-header">
            <h1 className="hv-name">{fullName}</h1>
            <div className="hv-top-rule" />
          </header>
{objective && (
  <TimelineSection
    title="RESUME OBJECTIVE"
    icon={
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6h14" />
        <path d="M5 10h14" />
        <path d="M5 14h10" />
        <path d="M5 18h12" />
      </svg>
    }
  >
    <p className="hv-summary hv-summary--objective">{objective}</p>
  </TimelineSection>
)}

{!!work.length && (
  <TimelineSection
    title="WORK EXPERIENCE"
    icon={
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M4 12h16" />
      </svg>
    }
  >
    {work.map((w, i) => (
      <article key={i} className="hv-item">
        <div className="hv-item-head">
          <div>
            <span className="hv-role">{w.position || w.title || "Role"}</span>
            {(w.company || w.name) && (
              <span className="hv-company"> — {w.company || w.name}</span>
            )}
          </div>
          <span className="hv-dates">{range(w.startDate, w.endDate)}</span>
        </div>

        {(w.summary || w.description) && (
          <p className="hv-summary">{w.summary || w.description}</p>
        )}

        {!!(w.highlights || []).length && (
          <ul className="hv-highlights">
            {w.highlights.map((h, j) => <li key={j}>{h}</li>)}
          </ul>
        )}
      </article>
    ))}
  </TimelineSection>
)}


          {!!education.length && (
            <TimelineSection
              title="EDUCATION AND QUALIFICATIONS"
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3l10 6-10 6L2 9l10-6z" />
                  <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
                </svg>
              }
            >
              {education.map((e, i) => (
                <article key={i} className="hv-item">
                  <div className="hv-item-head">
                    <div>
                      <span className="hv-role">{e.studyType || e.degree || "Degree"}</span>
                      {(e.institution || e.school) && (
                        <span className="hv-company"> — {e.institution || e.school}</span>
                      )}
                    </div>
                    <span className="hv-dates">{range(e.startDate, e.endDate)}</span>
                  </div>
                  {e.area && <p className="hv-summary">{e.area}</p>}
                  {e.summary && <p className="hv-summary">{e.summary}</p>}
                </article>
              ))}
            </TimelineSection>
          )}

          {!!skills.length && (
            <TimelineSection
              title="SKILLS"
              last
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="4" width="14" height="16" rx="2" />
                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                  <path d="M8 16h6" />
                </svg>
              }
            >
              <div className="hv-skills">
                {skills.map((s, i) => (
                  <div key={i} className="hv-skill-row">
                    <span className="hv-skill-name">{s.name || s.skill || s.skillName || "Skill"}</span>
                    <span className="hv-skill-dots">{renderDots(s.level)}</span>
                  </div>
                ))}
              </div>
            </TimelineSection>
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
    <span key={i} className={`hv-dot ${i < n ? "hv-dot-on" : ""}`} />
  ));
}
