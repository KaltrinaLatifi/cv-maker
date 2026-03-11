// src/CVTemplate.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toImgUrl } from "./utils/templateImage";


// Fallback static templates (local images)
const fallbackTemplates = [
  { id: 1, name: "Oxford",    image: "/assets/img/cv1d.png" },
  { id: 2, name: "Cambridge", image: "/assets/img/cv2d.png" },
  { id: 3, name: "Standford", image: "/assets/img/cv3d.png" },
  { id: 4, name: "Harvard",   image: "/assets/img/cv4d.png" },
  { id: 5, name: "Princeton", image: "/assets/img/cv5d.png" },
  { id: 6, name: "Edinburgh", image: "/assets/img/cv6d.png" },
  { id: 7, name: "Auckland",  image: "/assets/img/cv7d.png" },
];

/**
 * If VITE_API_BASE = "http://localhost:4000/api"
 *   -> API_ORIGIN = "http://localhost:4000"
 *   -> API_BASE    = "http://localhost:4000/api"
 */
const API_ORIGIN =
  (import.meta.env?.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE).replace(/\/api\/?$/i, "")
    : "http://localhost:4000");

const API_BASE = `${API_ORIGIN}/api`;
const TEMPLATES_ENDPOINT = `${API_BASE}/templates`;



function CVTemplate() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const resolveImage = (rawUrl, idx) => {
    const fallback = `/assets/img/cv${((idx % 7) + 1)}d.png`;
    if (!rawUrl) return fallback;

    // If a blob: got saved in DB, it won't load later → fallback
    if (String(rawUrl).startsWith("blob:")) return fallback;

    return toImgUrl(rawUrl) || fallback;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(TEMPLATES_ENDPOINT);
        if (!res.ok) throw new Error("Failed to load templates");
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
            const active = data.filter(
    (t) =>
      t.is_active === 1 ||
      t.is_active === true ||
      t.is_active === "1"
  );
           const mapped = active.map((t, idx) => ({
            id: t.id,
            name: t.templateName || `Template ${t.id}`,
            image: resolveImage(t.preview_image_url, idx),
          }));
          setTemplates(mapped);
        } else {
          setTemplates([]);
        }
      } catch (err) {
        console.error("Failed to fetch templates, using fallback:", err);
        setTemplates(fallbackTemplates);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container mt-5">Loading…</div>;

if (!loading && templates.length === 0) {
  return (
    <div className="container mt-5">
      <div className="alert alert-light border">
        Nuk ka ende template të disponueshme. Shtoji si admin.
      </div>
    </div>
  );
}


  return (
    <div className="container mt-5 cv-template-page">
      <h2 className="text-center mb-4">CV Templates</h2>
      <div className="row">
        {templates.map((template, i) => (
          <div className="col-md-4 mb-4" key={template.id ?? i}>
            <div className="card h-100 text-center template-card">
              <Link to={`/template/${template.id}`} className="text-decoration-none">
                <img
                  src={template.image}
                  className="card-img-top"
                  alt={template.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = `/assets/img/cv${((i % 7) + 1)}d.png`;
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title text-black">{template.name}</h5>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CVTemplate;
