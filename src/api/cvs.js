// src/api/cvs.js
import { api } from "./client";

export async function getCVs() {
  const { data } = await api.get("/managecv");
  return data;
}

export async function getCVById(id) {
  const { data } = await api.get(`/managecv/${id}`);
  return data;
}
