// src/pages/PreviewTemplatePage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getTemplateByKey, templates } from "../templates/registry";
import { getTemplates } from "../api/templates";
import { useAuth } from "../AuthContext";
import { getFullCv } from "../api/cv";

const THEME_PRESETS = [
  { key: "purple", accent: "#3d4364", rail: "#f3f4f6", border: "#d1d5db" },
  { key: "black", accent: "#111111", rail: "#f2f3f7", border: "#dde0e6" },
  { key: "grey", accent: "#6b7280", rail: "#f3f4f6", border: "#d1d5db" },
  { key: "brown", accent: "#705c50ff", rail: "#e3d9d0", border: "#bfae9f" },
  { key: "navy", accent: "#2f5689ff", rail: "#f1f5f9", border: "#cbd5e1" },
];

const DEFAULT_THEME = THEME_PRESETS[0];

export default function PreviewTemplatePage() {
  const { id } = useParams(); // cvId
  const cvId = Number(id);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const templateKey = searchParams.get("template") || "auckland";
  const setTemplate = (key) => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set("template", key);
        return p;
      },
      { replace: true }
    );
  };

  const [resume, setResume] = useState(null);
  const [apiTemplates, setApiTemplates] = useState([]);
  const [finalizing, setFinalizing] = useState(false);

  const { token, isAuthenticated } = useAuth() || {};
  const templatesLoaded = apiTemplates.length > 0;

  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function bundleToResumeShape(full) {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
    const ORIGIN = API_BASE.replace(/\/api$/, "");

    const photoUrl = full?.personal?.photo_url;
    const fixedPhotoUrl =
      photoUrl && !String(photoUrl).startsWith("http") ? `${ORIGIN}${photoUrl}` : photoUrl || "";

    // ✅ load saved theme from localStorage (per CV)
    let storedTheme = null;
    try {
      const raw = localStorage.getItem(`cv_theme_${cvId}`);
      storedTheme = raw ? JSON.parse(raw) : null;
    } catch {}

    const themeFromDb = full?.cvMeta?.theme || null;
    const finalTheme = storedTheme || themeFromDb || DEFAULT_THEME;

    return {
      title: full?.cvMeta?.title || "",
      personal: {
        ...(full.personal || {}),
        photo_url: fixedPhotoUrl,
      },
      work: full.experiences || [],
      education: full.education || [],
      skills: full.skills || [],
      interests: full.interests || [],
      objective: full?.personal?.objective || "",
      _meta: {
        templateKey: full?.cvMeta?.templateKey || "",
        theme: finalTheme,
      },
    };
  }

  function setTheme(preset) {
    setResume((r) => {
      const next = {
        ...(r || {}),
        _meta: { ...(r?._meta || {}), theme: preset },
      };
      try {
        localStorage.setItem(`cv_theme_${cvId}`, JSON.stringify(preset));
      } catch {}
      return next;
    });
  }

  // load CV
  useEffect(() => {
    (async () => {
      const full = await getFullCv(cvId);
      const data = bundleToResumeShape(full);
      setResume(data);

      const urlKey = searchParams.get("template");
      const savedKey = data?._meta?.templateKey;
      if (!urlKey && savedKey) setTemplate(savedKey);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvId]);

  // templates list
  useEffect(() => {
    (async () => {
      const list = await getTemplates();
      setApiTemplates(list || []);
    })();
  }, []);

  const TemplateComp = useMemo(() => {
    const t = getTemplateByKey(templateKey);
    return t?.component || getTemplateByKey("auckland")?.component;
  }, [templateKey]);

  async function finalizeCvAfterExport(targetCvId) {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    if (!isAuthenticated || !token) return;

    try {
      setFinalizing(true);
      const res = await fetch(`${API}/api/cv/${targetCvId}/finalize`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn("Finalize failed:", data?.error || `HTTP ${res.status}`);
      }
    } catch (e) {
      console.warn("Finalize error:", e);
    } finally {
      setFinalizing(false);
    }
  }

  async function onExportPdf() {
    if (!templatesLoaded) return;
    window.print();
    await finalizeCvAfterExport(cvId);
  }

  if (!resume) return <div style={{ padding: 24 }}>Loading…</div>;

  const activeThemeKey = resume?._meta?.theme?.key || DEFAULT_THEME.key;

  return (
    <div className="tpl-overlay" onClick={() => navigate(-1)}>
      <div className="tpl-dialog" onClick={(e) => e.stopPropagation()}>
        <div
          id="cv-root"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px 16px 80px",
          }}
        >
          {/* ✅ Force re-render when theme changes */}
          <TemplateComp key={`${templateKey}-${activeThemeKey}`} resume={resume} />
        </div>

        <div className="toolbar toolbar--bottom">
          <select value={templateKey} onChange={(e) => setTemplate(e.target.value)}>
            {templates.map((t) => (
              <option key={t.key} value={t.key}>
                {t.name}
              </option>
            ))}
          </select>

          {/* ✅ THEME DOTS */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {THEME_PRESETS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTheme(t)}
                title={t.key}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: activeThemeKey === t.key ? "2px solid #111" : "1px solid #ccc",
                  background: t.accent,
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button onClick={onExportPdf} disabled={!templatesLoaded || finalizing}>
            {finalizing ? "Finalizing…" : "Export PDF"}
          </button>

          <button onClick={() => navigate(-1)} disabled={finalizing}>
            Back
          </button>
        </div>

        <style>{`
          @page { size: A4 portrait; margin: 0; }

          .tpl-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .tpl-dialog {
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 24px 60px rgba(0,0,0,0.25);
            max-width: 100%;
            max-height: 100%;
            display: flex;
            flex-direction: column;
          }

          #cv-root { display: flex; justify-content: center; align-items: flex-start; padding: 16px 24px 80px; }
          #cv-root > .cv-a4 { width: 210mm; max-width: 210mm; }

          .toolbar {
            display: flex;
            gap: 12px;
            padding: 14px 18px;
            background: rgba(255, 255, 255, 0.97);
            border-top: 1px solid #e5e7eb;
            box-shadow: 0 -10px 26px rgba(0,0,0,0.08);
            z-index: 1001;
          }

          .toolbar--bottom { position: sticky; bottom: 0; justify-content: center; align-items: center; }

          .toolbar button, .toolbar select {
            height: 42px;
            padding: 0 18px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            cursor: pointer;
            transition: all 0.18s ease;
          }

          @media print {
            * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .tpl-overlay { position: static; background: transparent; box-shadow: none; }
            .tpl-dialog { box-shadow: none; border-radius: 0; }
            .toolbar { display: none !important; }
            body { background: white; }
            #cv-root { padding: 0 !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
