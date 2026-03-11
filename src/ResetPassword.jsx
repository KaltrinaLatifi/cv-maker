import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const token = (params.get("token") || "").trim();
  const email = (params.get("email") || "").trim();

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const linkInvalid = !token || !email;

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setErrMsg("");

    if (linkInvalid) {
      setErrMsg("Link-u është i pavlefshëm. Kërko një link të ri.");
      return;
    }
    if (newPassword.length < 6) {
      setErrMsg("Password duhet të ketë së paku 6 karaktere.");
      return;
    }
    if (newPassword !== confirm) {
      setErrMsg("Password-at nuk përputhen.");
      return;
    }

    try {
      setBusy(true);

      const { data } = await axios.post(`${API_BASE}/auth/reset-password`, {
        email,
        token,
        newPassword,
      });

      setMsg(data?.message || "Password u ndryshua me sukses.");
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (err) {
      console.error(err);
      const serverMsg = err.response?.data?.error;
      setErrMsg(serverMsg || "Reset dështoi. Kërko një link të ri.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-container login-container">
      <div className="login-card">
        <h2 className="login-title">Reset Password</h2>

        {linkInvalid ? (
          <>
            <p className="login-subtitle" style={{ color: "#000" }}>
              Link-u mungon ose është i gabim.
            </p>
            <div className="forgot-password" style={{ marginTop: 14 }}>
              <Link to="/login">← Back to Login</Link>
            </div>
          </>
        ) : (
          <>
            <p className="login-subtitle">
              Vendos password-in e ri për: <b>{email}</b>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New password*"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="login-input"
                autoComplete="new-password"
              />

              <input
                type="password"
                placeholder="Confirm new password*"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="login-input"
                autoComplete="new-password"
              />

              <button type="submit" className="login-button" disabled={busy}>
                {busy ? "Saving…" : "Save new password →"}
              </button>
            </form>

            {errMsg && (
              <p style={{ marginTop: 12, fontSize: 14, color: "crimson" }}>
                {errMsg}
              </p>
            )}
            {msg && (
              <p style={{ marginTop: 12, fontSize: 14, color: "#000" }}>{msg}</p>
            )}

            <div className="forgot-password" style={{ marginTop: 14 }}>
              <Link to="/login">← Back to Login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
