import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  // Popup (errors / info)
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Forgot Password popup
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotBusy, setForgotBusy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithToken } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const nextParam = searchParams.get("next");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setPopupMessage("Ju lutem shkruani email-in dhe fjalëkalimin.");
      setShowPopup(true);
      return;
    }

    try {
      setBusy(true);

      const { data } = await axios.post(`${API_BASE}/login`, {
        email,
        password,
      });

      const token = data?.token;
      if (!token) throw new Error("No token returned from server");

      loginWithToken(token);

      const ADMIN_EMAILS = ["admin@example.com"];
      const role =
        data?.role ||
        (ADMIN_EMAILS.includes(String(email).trim().toLowerCase())
          ? "admin"
          : "user");

      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", "true");

      if (nextParam === "create") {
        navigate("/", { replace: true });
        return;
      }

      navigate(role === "admin" ? "/Dashboard" : "/", { replace: true });
    } catch (err) {
      console.error(err);

      const status = err.response?.status;
      const serverMsg = err.response?.data?.error;

      let msg;
      if (status === 404) {
        msg =
          "Ky email nuk është i regjistruar.\nJu lutem krijoni një llogari dhe më pas provoni të identifikoheni.";
      } else if (status === 401) {
        msg = serverMsg || "Email ose fjalëkalim gabim.";
      } else {
        msg = serverMsg || err.message || "Identifikimi dështoi.";
      }

      setPopupMessage(msg);
      setShowPopup(true);
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setForgotMsg("");

    const em = String(forgotEmail || "").trim().toLowerCase();
    if (!em) {
      setForgotMsg("Shkruaje email-in.");
      return;
    }

    try {
      setForgotBusy(true);

      // backend supports both /api/auth/... and /api/...
      await axios.post(`${API_BASE}/auth/forgot-password`, { email: em });

      setForgotMsg(
        "Nëse email ekziston, do të pranosh një link për ndryshim të password-it. Kontrollo edhe Spam/Promotions."
      );
    } catch (err) {
      console.error(err);
      // For security, keep same message
      setForgotMsg(
        "Nëse email ekziston, do të pranosh një link për ndryshim të password-it. Kontrollo edhe Spam/Promotions."
      );
    } finally {
      setForgotBusy(false);
    }
  }

  return (
    <>
      <div className="auth-container login-container">
        <div className="login-card">
          <h2 className="login-title">Log In</h2>
          <p className="login-subtitle">
            Enter your email address and password to log in
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              autoComplete="email"
            />

            <input
              type="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              autoComplete="current-password"
            />

            {/* Links row */}
            <div
              className="forgot-password"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                type="button"
                onClick={() => {
                  setForgotMsg("");
                  setForgotEmail(email || "");
                  setShowForgot(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1f6fff",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Forgot password?
              </button>

              <Link to="/register">Don't have an account? Register</Link>
            </div>

            <button type="submit" className="login-button" disabled={busy}>
              {busy ? "Logging in…" : "Log In →"}
            </button>
          </form>
        </div>
      </div>

      {/* Main popup (errors/info) */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px 28px",
              borderRadius: "12px",
              maxWidth: "380px",
              width: "90%",
              boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
              textAlign: "center",
              color: "#000",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: "10px", color: "#000" }}>Njoftim</h3>

            <p
              style={{
                fontSize: "14px",
                marginBottom: "18px",
                color: "#000",
                whiteSpace: "pre-line",
              }}
            >
              {popupMessage}
            </p>

            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  background: "#f5f5f5",
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={() => setShowPopup(false)}
              >
                Mbyll
              </button>

              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#1f6fff",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowPopup(false);
                  navigate("/register", { replace: true });
                }}
              >
                Regjistrohu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot password popup */}
      {showForgot && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000, // above the other popup just in case
          }}
          onClick={() => setShowForgot(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px 28px",
              borderRadius: "12px",
              maxWidth: "420px",
              width: "92%",
              boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
              color: "#000",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 8, color: "#000" }}>Forgot password</h3>

            <p style={{ fontSize: 14, marginBottom: 12, color: "#000" }}>
              Shkruaje email-in dhe do të dërgojmë një link për reset.
            </p>

            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Email address*"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="login-input"
                autoComplete="email"
              />

              <button
                type="submit"
                className="login-button"
                disabled={forgotBusy}
              >
                {forgotBusy ? "Sending…" : "Send reset link"}
              </button>
            </form>

            {forgotMsg && (
              <p style={{ marginTop: 12, fontSize: 13, color: "#000" }}>
                {forgotMsg}
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  background: "#f5f5f5",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                Close
              </button>
            </div>

            <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
              Shënim: Link-u i reset-it hapet nga email-i.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
