// src/api/client.js
import axios from "axios";

const BASE = (import.meta.env.VITE_API_BASE || "http://localhost:4000/api").replace(/\/+$/, "");

export const api = axios.create({
  baseURL: BASE, // e.g. http://localhost:4000/api
  headers: { "Content-Type": "application/json" },
});

// attach/remove Authorization on demand
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("jwt", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("jwt");
  }
}

// Bootstrap auth header on refresh if a token already exists
const boot = localStorage.getItem("jwt");
if (boot) setAuthToken(boot);
