// src/utils/templateImage.js
// Nxjerr URL absolute nga çfarëdo path-i që kemi në DB
const API_ORIGIN =
  (import.meta.env?.VITE_API_BASE
    ? String(import.meta.env.VITE_API_BASE).replace(/\/api\/?$/i, "")
    : "http://localhost:4000");

export const toImgUrl = (p) => {
  if (!p) return "";
  const url = String(p);

  // nëse është absolute, e lëmë siç është
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  // shembull nga DB: "/uploads/templates/previewImage-1762992612145.png"
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};
