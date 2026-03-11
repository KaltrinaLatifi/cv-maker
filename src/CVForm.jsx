// src/CVForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { api } from "./api/client";
import { useAuth } from "./AuthContext";

export default function CVForm({ onPersonalInfoSubmit }) {
  const navigate = useNavigate();
  const { cvId: paramId } = useParams();
  const { isAuthenticated, token, loading } = useAuth();

  const [status, setStatus] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const [errors, setErrors] = useState({});

  // ✅ ONLY source of truth is URL param
  const cvId = Number(paramId || 0);

  // 1) Guard auth
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || !token) {
      navigate("/login?next=create", { replace: true });
    }
  }, [loading, isAuthenticated, token, navigate]);

  // 2) If URL has no cvId -> open user's draft and redirect to /cvform/:cvId
  // ✅ NO localStorage cvId
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated || !token) return;

    if (paramId) return; // already have cvId in URL

    (async () => {
      try {
        setStatus("Opening your draft…");
        const res = await api.get("/cv/draft/full"); // axios returns {data: ...}
        const draftId = res?.data?.cvMeta?.id;

        if (!draftId) throw new Error("Draft CV not found");

        navigate(`/cvform/${draftId}`, { replace: true });
      } catch (e) {
        console.error("[CVForm/get draft] error", e);
        setStatus(e?.response?.data?.error || e.message || "Failed to open draft");
      }
    })();
  }, [paramId, isAuthenticated, token, loading, navigate]);

  // Helper: build absolute photo URL for preview
  function toAbsolutePhotoUrl(photo_url) {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
    const ORIGIN = API_BASE.replace(/\/api$/, "");
    if (!photo_url) return "";
    const s = String(photo_url);
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    return `${ORIGIN}${s}`; // backend stores like "/uploads/profile/xxx.jpg"
  }

  // 3) Load personaldetails from DB and prefill
  useEffect(() => {
    if (!cvId || loading) return;
    if (!isAuthenticated || !token) return;

    let cancelled = false;

    (async () => {
      setStatus("Loading…");
      try {
        const res = await api.get(`/cv/personal/${cvId}`);
        const saved = res.data; // row or null

        if (cancelled) return;

        if (saved) {
          setFirstName(saved.first_name || "");
          setLastName(saved.last_name || "");
          setEmail(saved.email || "");
          setPhone(saved.phone_number || "");
          setAddress(saved.address || "");
          setZip(saved.zip_code || "");
          setCity(saved.city || "");

          const fullPhoto = toAbsolutePhotoUrl(saved.photo_url);
          setPhotoUrl(fullPhoto);
          setPhotoPreview(fullPhoto);
        } else {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setAddress("");
          setZip("");
          setCity("");
          setPhotoUrl("");
          setPhotoPreview("");
        }

        setStatus("");
      } catch (err) {
        console.error("[load personaldetails] error", err);
        setStatus(err?.response?.data?.error || err.message || "Load failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cvId, isAuthenticated, token, loading]);

  // 4) (optional) local autosave while typing (kept, but NOT used for cvId)
  useEffect(() => {
    const draft = {
      cvId,
      firstName,
      lastName,
      email,
      phone,
      address,
      zip,
      city,
      photoUrl,
    };
    localStorage.setItem("cvPersonalDraft", JSON.stringify(draft));
  }, [cvId, firstName, lastName, email, phone, address, zip, city, photoUrl]);

  // 5) Save + Next
  const handleNext = async () => {
    if (!cvId) {
      alert("Missing CV id. Please open your CV again.");
      return;
    }
    if (!isAuthenticated || !token) {
      alert("You must be logged in to continue.");
      return;
    }

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9]{8,15}$/.test(phone.replace(/\s+/g, "")))
      newErrors.phone = "Phone number must be 8–15 digits.";

    if (!city.trim()) newErrors.city = "City / Town is required.";
    if (zip && !/^[0-9]{3,10}$/.test(zip)) newErrors.zip = "ZIP must contain only numbers.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setStatus("");

    // IMPORTANT: backend photo_url should be relative (/uploads/...) not absolute
    const relativePhoto =
      photoUrl && photoUrl.startsWith("http://localhost:4000")
        ? photoUrl.replace("http://localhost:4000", "")
        : photoUrl && photoUrl.startsWith("http")
        ? null
        : photoUrl || null;

    const payload = {
      cvId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      address,
      zip_code: zip,
      city,
      ...(relativePhoto ? { photo_url: relativePhoto } : {}),
    };

    try {
      setStatus("Saving…");
      await api.put(`/cv/personal/${cvId}`, payload);
      setStatus("Saved ✓");

      onPersonalInfoSubmit?.({
        firstName,
        lastName,
        email,
        phone,
        address,
        zip,
        city,
        cvId,
      });

      navigate(`/Page2/${cvId}`);
    } catch (err) {
      console.error("[CVForm/save] error", err);
      const msg = err?.response?.data?.error || err.message || "Save failed";
      setStatus(msg);
      alert(msg);
    }
  };

  // Photo upload
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !cvId) return;

    const localPreview = URL.createObjectURL(file);
    setPhotoPreview(localPreview);

    try {
      const fd = new FormData();
      fd.append("photo", file);

      const res = await api.post(`/cv/personal/${cvId}/photo`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.photo_url) {
        const fullUrl = toAbsolutePhotoUrl(res.data.photo_url);
        setPhotoUrl(fullUrl);
        setPhotoPreview(fullUrl);
      }
    } catch (err) {
      console.error("[photo upload]", err);
      alert(err?.response?.data?.error || err.message || "Photo upload failed");
    }
  };

  return (
    <>
      <div className="step-header step-header--tall">
        <h2>Personal Information</h2>
        <div className="step-progress step-progress--spaced">
          <div className="step active">
            <span className="icon">
  <i className="bi bi-person-fill"></i>
</span>
            <span className="label">Personal</span>
          </div>
          <div className="line active-line"></div>
          <div className="step">
            <span className="icon">📄</span>
            <span className="label">Experiences</span>
          </div>
          <div className="line"></div>
          <div className="step">
            <span className="icon">✏️</span>
            <span className="label">Template</span>
          </div>
        </div>
      </div>

      <div className="container mt-5" style={{ maxWidth: 1200 }}>
        {status && (
          <div className="alert alert-light border" role="alert">
            <strong>Status:</strong> {status}
          </div>
        )}

        <div className="section-box">
          <h3 className="personal-title">
  <i className="bi bi-person-fill"></i> Personal Details
</h3>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 24,
              alignItems: "start",
            }}
          >
            {/* LEFT PHOTO CARD */}
            <div
              style={{
                border: "1px dashed #cfcfe6",
                borderRadius: 8,
                padding: 16,
                height: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#eee",
                }}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="fa-solid fa-camera" style={{ fontSize: 34, opacity: 0.6 }} />
                  </div>
                )}
              </div>

              <div style={{ marginTop: 10, fontSize: 13, opacity: 0.75 }}>
                Add photo (optional)
              </div>

              <label
                style={{
                  marginTop: 10,
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #ddd",
                  background: "#fff",
                  fontSize: 13,
                }}
              >
                Upload
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </label>
            </div>

            {/* RIGHT FORM */}
            <form>
              <div className="flex-row">
                <div style={{ width: "100%" }}>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                <div style={{ width: "100%" }}>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
              </div>

              <div className="flex-row">
                <div style={{ width: "100%" }}>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div style={{ width: "100%" }}>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className="flex-row">
                <div style={{ width: "100%" }}>
                  <input
                    type="text"
                    className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                    placeholder="Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                </div>

                <div style={{ width: "100%" }}>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    placeholder="City / Town *"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
              </div>

              <div className="step-navigation">
                <button
                  type="button"
                  className="step-btn next step-btn--pill"
                  onClick={handleNext}
                >
                  Next step <span className="arrow">▶</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
