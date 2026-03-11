// src/api/contact.js
import { api } from "./client";

// ADMIN: read all messages (secured)
export async function getMessages() {
  const { data } = await api.get("/contact");
  return data;
}

// ADMIN: read one message (secured)
export async function getMessageById(id) {
  const { data } = await api.get(`/contact/${id}`);
  return data;
}

// PUBLIC: send message (keep public route: POST /api/contact)
export async function sendMessage(messageData) {
  const { data } = await api.post("/contact", messageData);
  return data;
}
