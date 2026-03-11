// src/Page3.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  templates as registryTemplates,
  getTemplateByKey,
} from "./templates/registry";
import { toImgUrl } from "./utils/templateImage";
import { updateCvTemplate, getFullCv } from "./api/cv";

const API_TEMPLATES = "http://localhost:4000/api/templates";

export default function Page3() {
  const navigate = useNavigate();
  const { cvId: paramId } = useParams();
  const cvId = String(paramId || localStorage.getItem("cvId") || "");

  const [status, setStatus] = useState("Loading…");
  const [saving, setSaving] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [selectedKey, setSelectedKey] = useState(
    localStorage.getItem("selectedTemplateKey") || ""
  );

  // preview modal state
  const [previewTpl, setPreviewTpl] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  /** Load templates from database */
  useEffect(() => {
    fetch(API_TEMPLATES)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch templates");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setTemplates([]);
          return;
        }

        const active = data.filter(
          (t) =>
            t.is_active === 1 ||
            t.is_active === true ||
            t.is_active === "1"
        );

        const dbTemplates = active.map((t, idx) => {
          const derivedKey = t.templateKey
            ? String(t.templateKey)
            : t.templateName
            ? t.templateName.toLowerCase().replace(/\s+/g, "-")
            : `template-${t.id}`;

          const fallbackImg = `/assets/img/cv${(idx % 7) + 1}.png`;

          return {
            id: t.id,
            key: derivedKey,
            name: t.templateName || `Template ${t.id}`,
            image:
              t.preview_image_url &&
              !String(t.preview_image_url).startsWith("blob:")
                ? toImgUrl(t.preview_image_url)
                : fallbackImg,
            _fromDb: true,
          };
        });

        setTemplates(dbTemplates);
        setStatus("");
      })
      .catch((err) => {
        console.error("Failed to load templates", err);
        setTemplates([]);
        setStatus("");
      });
  }, []);

  /** Basic cvId validation */
  useEffect(() => {
    if (!cvId) setStatus("Mungon cvId. Krijo CV-në sërish.");
    else setStatus("");
  }, [cvId]);

  /** Convert backend full bundle -> template-friendly resume shape */
  function bundleToResumeShape(full) {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
    const ORIGIN = API_BASE.replace(/\/api$/, "");

    const photoUrl = full?.personal?.photo_url;
    const fixedPhotoUrl =
      photoUrl && !String(photoUrl).startsWith("http")
        ? `${ORIGIN}${photoUrl}`
        : photoUrl || "";

    return {
      title: full?.cvMeta?.title || "",
      personal: {
        ...(full.personal || {}),
        photo_url: fixedPhotoUrl,
      },
      // ✅ map to what templates expect
      work: full.experiences || [],
      education: full.education || [],
      skills: full.skills || [],
      interests: full.interests || [],
      objective: full?.personal?.objective || "",
      _meta: {
        templateKey: selectedKey || "",
      },
    };
  }

  /** Open modal preview */
  async function openPreview(tpl) {
    const reg = getTemplateByKey(tpl.key);

    // If template not in registry → cannot preview → select directly
    if (!reg) {
      setSelectedKey(tpl.key);
      localStorage.setItem("selectedTemplateKey", tpl.key);
      localStorage.setItem("selectedTemplateImage", tpl.image);
      return;
    }

    if (!cvId) return;

    try {
      setSaving(true);

      const full = await getFullCv(cvId);
      const resumeShape = bundleToResumeShape(full);

      setPreviewData(resumeShape);
      setPreviewTpl(tpl);
    } catch (e) {
      console.error(e);
      alert("Nuk arrita të ngarkoj të dhënat për shikim.");
    } finally {
      setSaving(false);
    }
  }

  function closePreview() {
    setPreviewTpl(null);
    setPreviewData(null);
  }

  // Save chosen template for this CV
  async function confirmSelect() {
    if (!previewTpl) return;
    if (!cvId) {
      alert("Missing CV id.");
      return;
    }

    try {
      setSelectedKey(previewTpl.key);
      localStorage.setItem("selectedTemplateKey", previewTpl.key);
      localStorage.setItem("selectedTemplateImage", previewTpl.image);

      await updateCvTemplate(cvId, previewTpl.id);
    } catch (err) {
      console.error("Failed to update CV template:", err);
      alert("Template was selected, but failed to save it in the database.");
    } finally {
      closePreview();
    }
  }

  /** Proceed to full preview page */
  async function handlePreviewOrDownload() {
    const key = selectedKey || localStorage.getItem("selectedTemplateKey");
    if (!key) return alert("Zgjidh një template më parë.");
    if (!cvId) return alert("Missing CV id.");

    navigate(`/preview/${cvId}?template=${key}`); // ✅ CV ID, not resume ID
  }

  function handlePrev() {
    if (cvId) navigate(`/Page2/${cvId}`);
    else navigate(-1);
  }

  if (status) {
    return (
      <div className="container">
        <div className="alert alert-light border">{status}</div>
      </div>
    );
  }

  return (
    <>
      {/* TOP HEADER */}
      <div className="step-header">
        <h2>Choose a template</h2>
        <div className="step-progress">
          <div className="step active">
            <span className="icon">
  <i className="bi bi-person-fill"></i>
</span>
            <span className="label">Personal</span>
          </div>
          <div className="line active-line"></div>
          <div className="step active">
            <span className="icon">📄</span>
            <span className="label">Experiences</span>
          </div>
          <div className="line active-line"></div>
          <div className="step active">
            <span className="icon">✏️</span>
            <span className="label">Template</span>
          </div>
        </div>
      </div>

      <div className="container">
        {saving && (
          <div className="alert alert-info">Po ngarkoj preview…</div>
        )}

        {/* TEMPLATE GRID */}
        <div className="templates-grid">
          {templates.map((t) => (
            <div
              key={t.id}
              className={`template-box ${
                selectedKey === t.key ? "selected-template" : ""
              }`}
              onClick={() => openPreview(t)}
              style={{ cursor: "pointer" }}
              title={`Preview ${t.name}`}
            >
              <h4 style={{ textAlign: "center", marginBottom: 8 }}>{t.name}</h4>

              <img
                src={t.image}
                alt={t.name}
                style={{ width: "100%", borderRadius: 4 }}
              />

              {!getTemplateByKey(t.key) && (
                <p style={{ fontSize: 11, marginTop: 6, textAlign: "center" }}>
                  (selected directly)
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="step-navigation" style={{ marginTop: "3rem" }}>
          <button className="step-btn prev" onClick={handlePrev}>
            ◀ Previous
          </button>

          <button
            className="step-btn next"
            onClick={handlePreviewOrDownload}
            disabled={saving}
          >
            {saving ? "Loading…" : "Preview / Download"}
          </button>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewTpl && previewData && (
        <div style={overlay} onClick={closePreview}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalTop}>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={closePreview}
              >
                ✕
              </button>
            </div>

            <div style={fitArea} className="fit-area">
              <div
                className="tpl-preview-scroll"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "16px 16px 32px",
                  overflow: "auto",
                  maxHeight: "calc(100vh - 220px)",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div style={{ transform: "scale(0.9)", transformOrigin: "top center" }}>
                  {(() => {
                    const reg = getTemplateByKey(previewTpl.key);
                    const Comp = reg?.component;
                    return Comp ? (
                      <Comp resume={previewData} />
                    ) : (
                      <div style={{ padding: 20 }}>Template component not found.</div>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div style={disclaimerStyle}>
              This is only a zoomed preview. PDF / Export will be the correct A4 size.
            </div>

            <div style={{ textAlign: "center", paddingBottom: 12 }}>
              <button
                className="btn btn-primary"
                style={useTplBtnStyle}
                onClick={confirmSelect}
              >
                Use this template
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .tpl-preview-scroll::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
        `}
      </style>
    </>
  );
}

/* MODAL STYLES */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal = {
  width: "min(950px, 96vw)",
  maxHeight: "calc(100vh - 40px)",
  background: "#ffffff",
  padding: "16px 18px 12px",
  borderRadius: 8,
  boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
};

const modalTop = {
  display: "flex",
  justifyContent: "flex-end",
  paddingBottom: 8,
};

const fitArea = {
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 0 12px",
  background: "transparent",
};

const disclaimerStyle = {
  color: "#555",
  fontSize: "15px",
  fontWeight: 500,
  textAlign: "center",
  marginTop: "14px",
  marginBottom: "40px",
  lineHeight: "1.4",
};

const useTplBtnStyle = {
  backgroundColor: "#4F46E5",
  borderColor: "#4338CA",
  color: "#fff",
  padding: "8px 24px",
  borderRadius: 6,
};
