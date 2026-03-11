// src/Scroll.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Wait one tick so lazy sections render, then jump instantly (no smooth scroll)
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }, 0);
  }, [pathname, hash]);

  return null;
}
