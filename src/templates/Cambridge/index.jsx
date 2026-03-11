// src/templates/Cambridge/index.jsx
import React from "react";
import { A4, Section, range } from "../base/atoms";
import "./cambridge.css";

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

/** Timeline wrapper: left vertical line only (NO icons), right content */
function TimelineSection({ title, children, last = false }) {
  return (
    <div className={`cam-tl ${last ? "cam-tl--last" : ""}`}>
      <div className="cam-tl-left">
        <div className="cam-tl-line" />
      </div>

      <div className="cam-tl-right">
        <Section title={title}>{children}</Section>
      </div>
    </div>
  );
}

export default function Cambridge({ resume }) {
  // Support BOTH shapes like you did in Princeton
  const p = resume?.personal || {};
  const b = resume?.basics || {};
  const loc = b.location || {};

  const work = resume?.work || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const interests = resume?.interests || [];
  const references = resume?.references || [];

  const img = photoSrc(p.photo_url || b.image);

  const fullName =
    [p.first_name, p.last_name].filter(Boolean).join(" ") || b.name || "";

  const email = p.email || b.email || "";
  const phone = p.phone_number || b.phone || "";

  const addressLine = p.address || b.address || loc.address || "";
  const postalCode = p.zip_code || loc.postalCode || "";
  const city = p.city || loc.city || "";

  // Address in one row like you wanted before (Street · ZIP)
  const addressValue = [addressLine, postalCode].filter(Boolean).join(" · ");
  const cityValue = city;

  const hasPersonal = Boolean(
    fullName || addressValue || cityValue || phone || email
  );

  const objective =
    resume?.objective || p.objective || b.summary || b.objective || "";

  const interestList = interests
    .map(
      (h) =>
        h?.name || h?.label || h?.hobby || (typeof h === "string" ? h : "")
    )
    .filter(Boolean);

  // TOP BAR title should be actual name
  const titleText = fullName || "Curriculum Vitae";

  // ✅ THEME
  const theme = resume?._meta?.theme || {};
  const bar = theme.accent || "#3f6a98";
  const muted = theme.muted || "#6b7280";
  // optional if later you want sidebar theme:
  // const rail = theme.rail || "#ffffff";

  return (
    <A4
      className="cam2-page"
      style={{
        "--bar": bar,
        "--muted": muted,
        // "--rail": rail,
      }}
    >
      <div className="cam2-layout">
        {/* TOP RIBBON */}
        <div className="cam2-topBar">
          <div className="cam2-topTitle">{titleText}</div>
        </div>

        {/* LEFT SIDEBAR */}
        <aside className="cam2-left">
          {img && (
            <div className="cam2-photoWrap">
              <img className="cam2-photo" src={img} alt="Profile" />
            </div>
          )}

          <div className="cam2-leftBody">
            {hasPersonal && (
              <div className="cam2-sideSection">
                <h2 className="cam2-sideTitle">PERSONAL</h2>

                <ul className="cam2-sideList cam2-contactList">
                  {/* NAME */}
                  {fullName && (
                    <li>
                      <span className="cam2-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M20 21a8 8 0 0 0-16 0"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="8"
                            r="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="cam2-contactText">
                        <span className="cam2-contactLabel">Name</span>
                        <span className="cam2-contactValue">{fullName}</span>
                      </div>
                    </li>
                  )}

                  {/* ADDRESS */}
                  {addressValue && (
                    <li>
                      <span className="cam2-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M3 11L12 3l9 8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 10.5V21h5v-6h4v6h5v-10.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="cam2-contactText">
                        <span className="cam2-contactLabel">Address</span>
                        <span className="cam2-contactValue">{addressValue}</span>
                      </div>
                    </li>
                  )}

                  {/* CITY */}
                  {cityValue && (
                    <li>
                      <span className="cam2-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="cam2-contactText">
                        <span className="cam2-contactLabel">City</span>
                        <span className="cam2-contactValue">{cityValue}</span>
                      </div>
                    </li>
                  )}

                  {/* PHONE */}
                  {phone && (
                    <li>
                      <span className="cam2-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M7 2h3l1.5 4.5L9 8.5C10.2 11 12 12.8 14.5 14l2-2.5L21 13v3a3 3 0 0 1-3 3C11.8 19 7 14.2 7 8a3 3 0 0 1 3-3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="cam2-contactText">
                        <span className="cam2-contactLabel">Phone number</span>
                        <span className="cam2-contactValue">{phone}</span>
                      </div>
                    </li>
                  )}

                  {/* EMAIL */}
                  {email && (
                    <li>
                      <span className="cam2-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="1.5"
                            ry="1.5"
                          />
                          <path
                            d="M4 7l8 6 8-6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="cam2-contactText">
                        <span className="cam2-contactLabel">Email</span>
                        <span className="cam2-contactValue">{email}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {!!interestList.length && (
              <div className="cam2-sideSection">
                <h2 className="cam2-sideTitle">INTERESTS</h2>
                <div className="cam2-interestsPlain">
                  {interestList.map((txt, i) => (
                    <div key={i} className="cam2-interestPlainRow">
                      {txt}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT MAIN */}
        <main className="cam2-main">
  {objective && (
    <TimelineSection title="RESUME OBJECTIVE">
      <div className="cam2-text">{objective}</div>
    </TimelineSection>
  )}
        
          {!!work.length && (
            <TimelineSection title="WORK EXPERIENCE">
              {work.map((w, i) => (
                <article key={i} className="cam2-item">
                  <div className="cam2-itemRow">
                    <div className="cam2-leftDate cam2-leftDate--L">
                      {range(w.startDate, w.endDate)}
                    </div>

                    <div className="cam2-mainBlock">
                      <div className="cam2-roleLine">
                        <span className="cam2-role">
                          {w.position || w.title || "Role"}
                        </span>
                      </div>

                      {(w.company || w.name || w.location || w.city) && (
                        <div className="cam2-subtle">
                          {[w.company || w.name, w.location || w.city]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      )}

                      {(w.summary || w.description) && (
  <div className="cam2-text">{w.summary || w.description}</div>
)}


                      {!!(w.highlights || []).length && (
                        <ul className="cam2-bullets">
                          {w.highlights.map((h, j) => (
                            <li key={j}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </TimelineSection>
          )}


          {!!education.length && (
            <TimelineSection title="EDUCATION AND QUALIFICATIONS">
              {education.map((e, i) => (
                <article key={i} className="cam2-item">
                  <div className="cam2-itemRow">
                    <div className="cam2-leftDate cam2-leftDate--L">
                      {range(e.startDate, e.endDate)}
                    </div>

                    <div className="cam2-mainBlock">
                      <div className="cam2-roleLine">
                        <span className="cam2-role">
                          {e.studyType || e.degree || "Degree"}
                        </span>
                      </div>

                      {(e.institution || e.school || e.area || e.city) && (
                        <div className="cam2-subtle">
                          {[e.institution || e.school, e.area || e.city]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                      )}

                      {e.summary && <div className="cam2-text">{e.summary}</div>}
                    </div>
                  </div>
                </article>
              ))}
            </TimelineSection>
          )}

          {!!references.length && (
            <TimelineSection title="REFERENCES">
              {references.map((r, i) => (
                <article key={i} className="cam2-item">
                  <div className="cam2-refRow">
                    <div className="cam2-leftDate cam2-leftDate--L">
                      {r.reference || r.company || " "}
                    </div>
                    <div className="cam2-mainBlock">
                      <div className="cam2-roleLine">
                        <span className="cam2-role">{r.name || "Reference"}</span>
                      </div>
                      {(r.phone || r.email) && (
                        <div className="cam2-subtle">
                          {[r.phone, r.email].filter(Boolean).join(" · ")}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </TimelineSection>
          )}

          {!!skills.length && (
            <TimelineSection title="SKILLS" last>
              <div className="cam2-skills">
                {skills.map((s, i) => (
                  <div key={i} className="cam2-skillRow">
                    <span className="cam2-skillName">
                      {s.name || s.skill || s.skillName || "Skill"}
                    </span>
                    <span className="cam2-skillDots">{renderDots(s.level)}</span>
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
    <span key={i} className={`cam2-dot ${i < n ? "cam2-dotOn" : ""}`} />
  ));
}
