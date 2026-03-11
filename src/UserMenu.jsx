import React, { useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function initialsOf(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U"
  );
}

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // modal states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const initials = useMemo(() => initialsOf(user?.fullName || ""), [user?.fullName]);

  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const closeAll = () => {
    setOpen(false);
    setConfirmOpen(false);
    setPasswordOpen(false);
    setPassword("");
    setErr("");
    setBusy(false);
  };

  const onLogout = () => {
    closeAll();
    logout();
    navigate("/", { replace: true });
  };

  const startDeleteFlow = () => {
    setOpen(false);
    setErr("");
    setConfirmOpen(true);
  };

  const confirmDeleteYes = () => {
    setConfirmOpen(false);
    setPasswordOpen(true);
  };

  const doDelete = async () => {
    setErr("");
    if (!password.trim()) {
      setErr("Password is required.");
      return;
    }

    setBusy(true);
    try {
      const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token") ||
        "";

      const res = await fetch(`${API}/api/auth/me/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to delete account");

      // success -> logout + go home
      closeAll();
      logout();
      navigate("/", { replace: true });
    } catch (e) {
      setErr(e.message || "Something went wrong");
      setBusy(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          background: "#1E6BFF",
          color: "white",
          cursor: "pointer",
          fontWeight: 700,
        }}
        aria-label="User menu"
      >
        {initials}
      </button>

      {/* dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 54,
            width: 260,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            padding: 14,
            zIndex: 999,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, textAlign: "center" }}>
              {user?.fullName || "User"}
            </div>
            <div style={{ opacity: 0.7, fontSize: 13, textAlign: "center" }}>
              {user?.email || ""}
            </div>
          </div>

          <hr style={{ margin: "12px 0" }} />

          <button
            onClick={startDeleteFlow}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ef4444",
              background: "white",
              color: "#ef4444",
              cursor: "pointer",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Delete account
          </button>

          <button
            onClick={onLogout}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              color: "#111827",
              background: "white",
              cursor: "pointer",
              fontWeight: 600,
              textAlign: "center",
              lineHeight: "20px",
            }}
          >
            Log out
          </button>
        </div>
      )}

      {/* confirm modal */}
      {confirmOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            
            <p style={{ marginTop: 0, opacity: 0.8 }}>
              Are you sure you want to delete your account?
            </p>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={() => closeAll()}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  color: "#111827",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: "20px",
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteYes}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #ef4444",
                  background: "#ef4444",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* password modal */}
      {passwordOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            
            <p style={{ marginTop: 0, opacity: 0.8 }}>
              Confirm your password to delete your account
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
                color: "#111827",
                WebkitTextFillColor: "#111827",
                outline: "none",
              }}
              autoFocus
            />

            {err ? (
              <div style={{ marginTop: 10, color: "#ef4444", fontSize: 13 }}>
                {err}
              </div>
            ) : null}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={() => closeAll()}
                disabled={busy}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  color: "#111827",
                  cursor: busy ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: "20px",
                  opacity: busy ? 0.6 : 1,
                }}
              >
                Cancel
              </button>

              <button
                onClick={doDelete}
                disabled={busy}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #ef4444",
                  background: "#ef4444",
                  color: "white",
                  cursor: busy ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  opacity: busy ? 0.8 : 1,
                }}
              >
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  padding: 16,
};

const modalStyle = {
  width: "100%",
  maxWidth: 420,
  background: "white",
  borderRadius: 14,
  border: "1px solid #e5e7eb",
  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  padding: 18,
};
