// backend/routes/templateRequests.js
"use strict";

const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const verifyToken = require("../middleware/verifyToken");
const { sendTemplateRequestEmail } = require("../utils/mailer");

/* ---------------- helpers ---------------- */

async function isAdmin(userId) {
  const [rows] = await db.query("SELECT role FROM users WHERE id = ? LIMIT 1", [
    userId,
  ]);
  const u = rows[0];
  if (!u) return false;
  return String(u.role || "").toLowerCase() === "admin";
}

/* ---------------- upload config ---------------- */

// folder: backend/uploads/template-requests
const UP_DIR = path.join(__dirname, "..", "uploads", "template-requests");
fs.mkdirSync(UP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UP_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeName = `template-${Date.now()}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const ok =
      file.mimetype === "application/pdf" ||
      String(file.mimetype || "").startsWith("image/");
    if (!ok) return cb(new Error("Only PDF or image files are allowed."));
    cb(null, true);
  },
});

/* ---------------- routes ---------------- */

// POST /api/template-requests  (ADMIN ONLY)
router.post(
  "/",
  verifyToken,
  upload.single("inspirationFile"),
  async (req, res) => {
    try {
      /* ---- auth ---- */
      const admin = await isAdmin(req.user.id);
      if (!admin) {
        return res.status(403).json({ error: "Not authorized" });
      }

      /* ---- validation ---- */
      const { templateName = "", description = "" } = req.body || {};
      if (!templateName.trim()) {
        return res.status(400).json({ error: "Template name is required." });
      }

      /* ---- file ---- */
      const inspiration_file_url = req.file
        ? `/uploads/template-requests/${req.file.filename}`
        : "";

      /* ---- DB insert ---- */
      const [r] = await db.query(
        `
        INSERT INTO template_requests
          (templateName, description, inspiration_file_url, createdBy)
        VALUES (?, ?, ?, ?)
        `,
        [
          templateName.trim(),
          description || null,
          inspiration_file_url,
          req.user.id,
        ]
      );

      const requestId = r.insertId;

      /* ---- EMAIL (non-blocking) ---- */
      try {
        const origin = process.env.API_ORIGIN || "http://localhost:4000";
        const fullFileUrl = inspiration_file_url
          ? `${origin}${inspiration_file_url}`
          : "";

        console.log("[MAIL] Attempting send...");
        console.log("[MAIL] FROM:", process.env.MAIL_USER);
        console.log("[MAIL] TO:", process.env.MAIL_TO);

        await sendTemplateRequestEmail({
          requestId,
          templateName,
          description,
          fileUrl: fullFileUrl,
        });

        console.log("[MAIL] ✅ Sent successfully");
      } catch (mailErr) {
        // ❗ mail error should NOT fail the request
        console.error("[MAIL] ❌ Failed:", mailErr?.message || mailErr);
        console.error("[MAIL] FULL ERROR:", mailErr);
      }

      /* ---- response ---- */
      res.status(201).json({
        id: requestId,
        templateName,
        description,
        inspiration_file_url,
      });
    } catch (err) {
      console.error("[TEMPLATE REQUEST] Failed:", err);
      res.status(500).json({ error: "Failed to create template request" });
    }
  }
);

module.exports = router;
