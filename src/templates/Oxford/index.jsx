// src/templates/Oxford/index.jsx
import React from "react";
import { A4, Section, range } from "../base/atoms";
import "./oxford.css";

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

export default function Oxford({ resume }) {
  const p = resume?.personal || {};
  const b = resume?.basics || {};
  const loc = b.location || {};

  const work = resume?.work || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const interests = resume?.interests || [];

  const fullName =
    [p.first_name, p.last_name].filter(Boolean).join(" ") || b.name || "";

  const email = p.email || b.email || "";
  const phone = p.phone_number || b.phone || "";

  const addressLine = p.address || b.address || loc.address || "";
  const postalCode = p.zip_code || loc.postalCode || "";
  const city = p.city || loc.city || "";
  const cityLine = [postalCode, city].filter(Boolean).join(" ");

  const img = photoSrc(p.photo_url || b.image);

  const hasPersonal = Boolean(fullName || addressLine || cityLine || phone || email);

  const objective = resume?.objective || p.objective || b.summary || b.objective || "";

  const interestList = interests
    .map((h) => h?.name || h?.label || h?.hobby || (typeof h === "string" ? h : ""))
    .filter(Boolean);

  // ✅ Auckland-style theme vars
  const theme = resume?._meta?.theme || {};
  const accent = theme.accent || "#111111";
  const rail = theme.rail || "#f2f3f7";
  const border = theme.border || "#dde0e6";

  return (
    <A4
      className="ox2-page"
      style={{
        "--accent": accent,
        "--rail": rail,
        "--border": border,
      }}
    >
      <div className="ox2-wrap">
        <aside className="ox2-sidebar" />

        <main className="ox2-main">
          {/* header */}
          <header className="ox2-top">
            <div className="ox2-topLeft">
              {img && (
                <div className="ox2-photoWrap">
                  <img className="ox2-photo" src={img} alt="Profile" />
                </div>
              )}
              <div className="ox2-topTitle">{fullName || "Full name"}</div>
            </div>
          </header>

{/* PERSONAL */}
{hasPersonal && (
  <section className="ox2-block">
    <h2 className="ox2-h2 ox2-h2--strong">Personal</h2>
    <div className="ox2-rule" />

    <div className="ox2-personalGrid">
      {fullName && (
        <>
          <div className="ox2-label">Name</div>
          <div className="ox2-value">{fullName}</div>
        </>
      )}
      {addressLine && (
        <>
          <div className="ox2-label">Address</div>
          <div className="ox2-value">{addressLine}</div>
        </>
      )}
      {cityLine && (
        <>
          <div className="ox2-label">City</div>
          <div className="ox2-value">{cityLine}</div>
        </>
      )}
      {phone && (
        <>
          <div className="ox2-label">Phone number</div>
          <div className="ox2-value">{phone}</div>
        </>
      )}
      {email && (
        <>
          <div className="ox2-label">Email</div>
          <div className="ox2-value">{email}</div>
        </>
      )}
    </div>
  </section>
)}

{/* ✅ RESUME OBJECTIVE — MOVED UP */}
{objective && (
  <section className="ox2-block ox2-objective">
    <h2 className="ox2-h2 ox2-h2--strong">Resume objective</h2>
    <div className="ox2-rule" />
    <div className="ox2-text ox2-text--left">{objective}</div>
  </section>
)}

{/* ✅ WORK EXPERIENCE — NOW AFTER OBJECTIVE */}
{!!work.length && (
  <Section title="Work experience" right={null}>
    <div className="ox2-rule ox2-rule--section" />

    {work.map((w, i) => (
      <article key={i} className="ox2-tlItem">
        <div className="ox2-tlLeft">
          <span className="ox2-dot" />
          <span className="ox2-line" />
        </div>

        <div className="ox2-tlContent">
          <div className="ox2-role">
            {w.position || w.title || "Position"}
          </div>
          <div className="ox2-subtle">
            {[w.company || w.name, w.location || w.city]
              .filter(Boolean)
              .join(", ")}
          </div>
          {w.summary && <div className="ox2-text">{w.summary}</div>}
        </div>

        <div className="ox2-rightCol">
          {range(w.startDate, w.endDate)}
        </div>
      </article>
    ))}
  </Section>
)}




          {!!education.length && (
            <Section title="Education and Qualifications" right={null}>
              <div className="ox2-rule ox2-rule--section" />

              {education.map((e, i) => (
                <article key={i} className="ox2-tlItem">
                  <div className="ox2-tlLeft">
                    <span className="ox2-dot" />
                    <span className="ox2-line" />
                  </div>

                  <div className="ox2-tlContent">
                    <div className="ox2-role">{e.studyType || e.degree || "Degree"}</div>
                    <div className="ox2-subtle">
                      {[e.institution || e.school, e.area || e.city].filter(Boolean).join(", ")}
                    </div>
                    {e.summary && <div className="ox2-text">{e.summary}</div>}
                  </div>

                  <div className="ox2-rightCol">{range(e.startDate, e.endDate)}</div>
                </article>
              ))}
            </Section>
          )}

          {!!interestList.length && (
            <Section title="Interests" right={null}>
              <div className="ox2-rule ox2-rule--section" />

              {interestList.map((t, i) => (
                <article key={i} className="ox2-tlItem ox2-tlItem--interest">
                  <div className="ox2-tlLeft">
                    <span className="ox2-dot" />
                    <span className={`ox2-line ${i === interestList.length - 1 ? "ox2-line--stop" : ""}`} />
                  </div>

                  <div className="ox2-tlContent">
                    <div className="ox2-interestText">{t}</div>
                  </div>

                  <div className="ox2-rightCol ox2-rightCol--empty" />
                </article>
              ))}
            </Section>
          )}

          {!!skills.length && (
            <Section title="Skills" right={null}>
              <div className="ox2-rule ox2-rule--section" />

              {skills.map((s, i) => (
                <article key={i} className="ox2-tlItem ox2-tlItem--skill">
                  <div className="ox2-tlLeft">
                    <span className="ox2-dot" />
                    <span className="ox2-line ox2-line--skill" />
                  </div>

                  <div className="ox2-tlContent">
                    <div className="ox2-skillName">
                      {s.name || s.skill || s.skillName || "Skill"}
                    </div>
                  </div>

                  <div className="ox2-rightCol">{renderDots(s.level)}</div>
                </article>
              ))}
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
  return (
    <div className="ox2-dots">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`ox2-dotSkill ${i < n ? "ox2-dotSkillOn" : ""}`} />
      ))}
    </div>
  );
}
