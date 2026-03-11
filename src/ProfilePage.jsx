// src/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "./api/users";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getCurrentUser(); // { user: {...} }
        setUser(data.user || data);         // varet si e ke backend-in
        setStatus("ready");
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          // jo i loguar → dërgo në login
          navigate("/login");
        } else {
          setStatus("error");
        }
      }
    }
    load();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateCurrentUser({
        fullName: user.fullName,
        // këtu më vonë mund t’i shtosh field-e tjera
      });
      alert("Profili u përditësua me sukses!");
    } catch (err) {
      console.error(err);
      alert("Nuk u përditësua profili.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return <div style={{ padding: 24 }}>Loading profile…</div>;
  }

  if (status === "error") {
    return <div style={{ padding: 24 }}>Gabim gjatë ngarkimit të profilit.</div>;
  }

  if (!user) {
    return <div style={{ padding: 24 }}>Nuk u gjet profili.</div>;
  }

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: 480 }}>
        <h2 className="login-title">My Profile</h2>
        <p className="login-subtitle">
          Shiko dhe përditëso të dhënat e llogarisë tënde.
        </p>

        <label className="login-label">
          Full name
          <input
            type="text"
            name="fullName"
            className="login-input"
            value={user.fullName || ""}
            onChange={handleChange}
          />
        </label>

        <label className="login-label">
          Email
          <input
            type="email"
            className="login-input"
            value={user.email || ""}
            disabled
          />
        </label>

        <label className="login-label">
          Role
          <input
            type="text"
            className="login-input"
            value={user.role || "user"}
            disabled
          />
        </label>

        <button
          type="button"
          className="login-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
