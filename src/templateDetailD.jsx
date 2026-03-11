// src/templateDetailD.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toImgUrl } from "./utils/templateImage";

// 1–7 static ones (dona t’i lëmë si janë)
const staticTemplates = [
  { id: 1, name: "Oxford",    image: "/assets/img/cv1d.png" },
  { id: 2, name: "Cambridge", image: "/assets/img/cv2d.png" },
  { id: 3, name: "Standford", image: "/assets/img/cv3d.png" },
  { id: 4, name: "Harvard",   image: "/assets/img/cv4d.png" },
  { id: 5, name: "Princeton", image: "/assets/img/cv5d.png" },
  { id: 6, name: "Edinburgh", image: "/assets/img/cv6d.png" },
  { id: 7, name: "Auckland",  image: "/assets/img/cv7d.png" },
];

const API_BASE = "http://localhost:4000/api/templates";

export default function TemplateDetailD() {
  const { id } = useParams();
  const numericId = Number(id);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1) fillimisht shikojmë te static (id 1–7)
    const fromStatic = staticTemplates.find((t) => t.id === numericId);
    if (fromStatic) {
      setTemplate(fromStatic);
      return;
    }

    // 2) nëse s'është statik → shkojmë te backend
    setLoading(true);
    fetch(API_BASE)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load templates");
        return res.json();
      })
      .then((list) => {
        const found = list.find((t) => Number(t.id) === numericId);
        if (found) {
          const image =
            toImgUrl(found.preview_image_url) || "/assets/img/cv1d.png";

          setTemplate({
            id: found.id,
            name: found.templateName || `Template ${found.id}`,
            image,
            description: found.description || "",
          });
        } else {
          setTemplate(null);
        }
      })
      .catch((err) => {
        console.error("failed to load template", err);
        setTemplate(null);
      })
      .finally(() => setLoading(false));
  }, [numericId]);

  if (loading) {
    return <div className="container mt-5">Loading…</div>;
  }

  if (!template) {
    return (
      <div className="container mt-5">
        <div className="alert alert-light border">Template not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "1100px" }}>
      <h2 className="mb-4">{template.name} Template</h2>
      <div className="text-center">
        <img
          src={template.image}
          alt={template.name}
          className="img-fluid shadow-lg rounded"
          style={{ maxHeight: "1000px", objectFit: "contain" }}
        />
      </div>
      {template.description ? (
        <p className="mt-3 text-muted">{template.description}</p>
      ) : null}
    </div>
  );
}
