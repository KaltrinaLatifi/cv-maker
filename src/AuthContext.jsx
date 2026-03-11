// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { api, setAuthToken } from "./api/client";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  // keep token in state + localStorage (key = "jwt")
  const [token, setToken] = useState(() => localStorage.getItem("jwt") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // whenever token changes, sync axios + localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
      setAuthToken(token); // <-- your axios helper to set Authorization header
    } else {
      localStorage.removeItem("jwt");
      setAuthToken(null);  // remove Authorization header
      setUser(null);
    }
  }, [token]);

  // fetch current user when we have a token
  useEffect(() => {
    (async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // baseURL already includes /api, so "/me" hits GET /api/me
        const { data } = await api.get("/me");
        // backend responds { user: {...} }
        setUser(data.user || data);
      } catch {
        // bad or expired token -> force logout
        setToken("");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // call this after a successful login
  const loginWithToken = (newToken) => {
    setToken(newToken);
  };

const logout = () => {
  // clear JWT auth
  setToken("");

  // 🔥 clear admin auth
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("role");
  sessionStorage.removeItem("lastAdminPath");
};

  // 👇 this is what Hero.jsx wants to know
  const isAuthenticated = !!token;

  return (
    <AuthCtx.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated,
        setToken,
        setUser,
        loginWithToken,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
