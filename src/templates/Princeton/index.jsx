// src/templates/Princeton/index.jsx
import React from "react";
import { A4, range } from "../base/atoms";
import "./princeton.css";

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

export default function Princeton({ resume }) {
  const p = resume?.personal || {};
  const b = resume?.basics || {};
  const loc = b.location || {};

  const work = resume?.work || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const interests = resume?.interests || [];

  const fullName =
    [p.first_name, p.last_name].filter(Boolean).join(" ") || b.name || "";
  const titleText = fullName || "Curriculum Vitae";

  const email = p.email || b.email || "";
  const phone = p.phone_number || b.phone || "";

  const addressLine = p.address || b.address || loc.address || "";
  const postalCode = p.zip_code || loc.postalCode || "";
  const city = p.city || loc.city || "";

  const addressValue = [addressLine, postalCode].filter(Boolean).join(" · ");
  const cityValue = city || "";

  const img = photoSrc(p.photo_url || b.image);

  const hasPersonal = Boolean(fullName || addressValue || cityValue || phone || email);
  const objective = resume?.objective || p.objective || b.summary || b.objective || "";

  // ✅ Auckland theme support
  const theme = resume?._meta?.theme || {};
  const accent = theme.accent || "#111111";
  const rail = theme.rail || "#f2f3f7";
  const border = theme.border || "#dde0e6";

  return (
    <A4
      className="pr2-page"
      style={{
        "--accent": accent,
        "--rail": rail,
        "--border": border,
        "--text": "#111827",
        "--muted": "#6b7280",
      }}
    >
      {/* TOP BAR */}
      <header className="pr2-top">
        {img && <img className="pr2-photo" src={img} alt="Profile" />}
        <div className="pr2-titleWrap">
          <h1 className="pr2-title">{titleText}</h1>
        </div>
      </header>

      <div className="pr2-divider" />

      {/* PERSONAL */}
      {hasPersonal && (
        <>
          <h2 className="pr2-secTitle">PERSONAL</h2>

          <div className="pr2-personalRows">
            {fullName && (
              <div className="pr2-row3 pr2-row3--personal">
                <div className="pr2-leftLabel">Name</div>
                <div className="pr2-midCol">&nbsp;</div>
                <div className="pr2-rightCol">{fullName}</div>
              </div>
            )}

            {addressValue && (
              <div className="pr2-row3 pr2-row3--personal">
                <div className="pr2-leftLabel">Address</div>
                <div className="pr2-midCol">&nbsp;</div>
                <div className="pr2-rightCol">{addressValue}</div>
              </div>
            )}

            {cityValue && (
              <div className="pr2-row3 pr2-row3--personal">
                <div className="pr2-leftLabel">City</div>
                <div className="pr2-midCol">&nbsp;</div>
                <div className="pr2-rightCol">{cityValue}</div>
              </div>
            )}

            {phone && (
              <div className="pr2-row3 pr2-row3--personal">
                <div className="pr2-leftLabel">Phone number</div>
                <div className="pr2-midCol">&nbsp;</div>
                <div className="pr2-rightCol">{phone}</div>
              </div>
            )}

            {email && (
              <div className="pr2-row3 pr2-row3--personal">
                <div className="pr2-leftLabel">Email</div>
                <div className="pr2-midCol">&nbsp;</div>
                <div className="pr2-rightCol">{email}</div>
              </div>
            )}
          </div>

          <div className="pr2-divider pr2-divider--thin" />
        </>
      )}
      {objective && (
  <>
    <h2 className="pr2-secTitle">RESUME OBJECTIVE</h2>

    <div className="pr2-row3">
      <div className="pr2-eduLeft pr2-objectiveText">
        {objective}
      </div>
      <div className="pr2-midCol">&nbsp;</div>
      <div className="pr2-rightCol">&nbsp;</div>
    </div>

    <div className="pr2-divider pr2-divider--thin" />
  </>
)}


      {!!work.length && (
        <>
          <h2 className="pr2-secTitle">WORK EXPERIENCE</h2>

{work.map((w, i) => (
  <div key={i} className="pr2-row3 pr2-row3--work">
    <div className="pr2-eduLeft pr2-workLeft">
      <div className="pr2-roleLine">
        <span className="pr2-role">{w.position || w.title || "Role"}</span>
        {(w.company || w.name) && (
          <span className="pr2-company"> — {w.company || w.name}</span>
        )}
      </div>

      {(w.city || w.location) && (
        <div className="pr2-subtle">{w.city || w.location}</div>
      )}
    </div>

    <div className="pr2-midCol">&nbsp;</div>
    <div className="pr2-rightDate">{range(w.startDate, w.endDate)}</div>

    {(w.summary || w.description) && (
      <div className="pr2-workSummary">
        {w.summary || w.description}
      </div>
    )}

    {!!(w.highlights || []).length && (
      <ul className="pr2-bullets pr2-workBullets">
        {w.highlights.map((h, j) => <li key={j}>{h}</li>)}
      </ul>
    )}
  </div>
))}


          <div className="pr2-divider pr2-divider--thin" />
        </>
      )}




      {!!education.length && (
        <>
          <h2 className="pr2-secTitle">EDUCATION AND QUALIFICATIONS</h2>

          {education.map((e, i) => (
            <div key={i} className="pr2-row3 pr2-row3--edu">
              <div className="pr2-eduLeft">
                <div className="pr2-roleLine">
                  <span className="pr2-role">{e.studyType || e.degree || "Degree"}</span>
                  {(e.institution || e.school) && (
                    <span className="pr2-company"> — {e.institution || e.school}</span>
                  )}
                </div>

                {(e.city || e.area) && (
                  <div className="pr2-subtle">
                    {[e.area, e.city].filter(Boolean).join(", ")}
                  </div>
                )}

                {e.summary && <div className="pr2-text">{e.summary}</div>}
              </div>

              <div className="pr2-midCol">&nbsp;</div>
              <div className="pr2-rightDate">{range(e.startDate, e.endDate)}</div>
            </div>
          ))}

          <div className="pr2-divider pr2-divider--thin" />
        </>
      )}

      {!!skills.length && (
        <>
          <h2 className="pr2-secTitle">SKILLS</h2>

          {skills.map((s, i) => (
            <div key={i} className="pr2-row3 pr2-row3--skills">
              <div className="pr2-skillLeft">{s.name || s.skill || s.skillName || "Skill"}</div>
              <div className="pr2-midCol">&nbsp;</div>
              <div className="pr2-rightDots">{renderDots(s.level)}</div>
            </div>
          ))}

          <div className="pr2-divider pr2-divider--thin" />
        </>
      )}

      {!!interests.length && (
        <div className="pr2-sec pr2-keepTogether">
          <h2 className="pr2-secTitle pr2-keepWithNext">INTERESTS</h2>

          <div className="pr2-interestGrid">
            {interests
              .map((h) => h?.name || h?.label || h?.hobby || (typeof h === "string" ? h : ""))
              .filter(Boolean)
              .map((txt, i) => (
                <div key={i} className="pr2-interestRow">
                  <span className="pr2-interestDot" aria-hidden="true" />
                  <span className="pr2-interestText">{txt}</span>
                </div>
              ))}
          </div>
        </div>
      )}
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
  return (
    <div className="pr2-skillDots">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`pr2-dot ${i < n ? "pr2-dotOn" : ""}`} />
      ))}
    </div>
  );
}
