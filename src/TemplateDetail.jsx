// src/TemplateDetail.jsx  (ADMIN view)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toImgUrl } from "./utils/templateImage";

const API_BASE = "http://localhost:4000/api/templates";

export default function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(API_BASE)
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to load templates");
        }
        return res.json();
      })
      .then((list) => {
        const t = list.find((x) => String(x.id) === String(id));
        if (!t) setErr("Template not found");
        else setTemplate(t);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-5">Loading…</div>;
  if (err || !template)
    return (
      <div className="container mt-5">
        <div className="alert alert-light border">
          {err || "Template not found"}
        </div>
      </div>
    );

  // tani përdorim URL-në reale nga uploads, me fallback
  const imageSrc = toImgUrl(template.preview_image_url) || "/assets/img/cv1.png";

  return (
    <div className="container mt-5" style={{ maxWidth: 1000 }}>
      <h2 className="mb-3">{template.templateName}</h2>
      <p className="text-muted mb-4">
        {template.description || "No description"}
      </p>
      <div className="text-center">
        <img
          src={imageSrc}
          alt={template.templateName}
          className="img-fluid shadow-lg rounded"
          style={{ maxHeight: 600, objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
