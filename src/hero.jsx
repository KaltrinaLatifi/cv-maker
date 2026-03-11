// src/hero.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Hero() {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth() || {};
  const [loading, setLoading] = useState(false);

  const handleCreate = useCallback(async () => {
    // 1. force login first
    if (!isAuthenticated || !token) {
      navigate("/login?next=create");
      return;
    }

try {
  setLoading(true);

  const res = await fetch(`${API}/api/cv/draft`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

  localStorage.setItem("cvId", String(data.cvId));
  navigate(`/cvform/${data.cvId}`);
} catch (e) {
  alert(e.message || "Failed to create CV");
  console.error(e);
} finally {
  setLoading(false);
}
  }, [isAuthenticated, token, navigate]);

  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
            data-aos="fade-up"
          >
            <h1>Create a professional resume with ease</h1>
            <p>
              Our online builder helps you quickly create a polished CV, ready
              to download and share. Try it now for free!
            </p>
            <div className="d-flex">
              <button
                className="btn-get-started"
                onClick={handleCreate}
                disabled={loading}
              >
                {loading ? "Creating…" : "Create CV"}
              </button>
            </div>
          </div>

          <div
            className="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <img
              src="/assets/img/heroopic.png"
              className="img-fluid animated"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
