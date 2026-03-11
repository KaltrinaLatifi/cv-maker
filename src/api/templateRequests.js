//src\api\templateRequests.js
import { api } from "./client";

export async function createTemplateRequest(formData) {
  return api.post("/template-requests", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
