// backend/routes/templates.js
const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const verifyToken = require("../middleware/verifyToken");

// ---------- admin check, njësoj si te users ----------
async function isAdmin(userId) {
  const [rows] = await db.query(
    "SELECT role FROM users WHERE id = ? LIMIT 1",
    [userId]
  );
  const u = rows[0];
  if (!u) return false;
  return String(u.role || "").toLowerCase() === "admin";
}

// ensure folder exists
const UP_DIR = path.join(__dirname, "..", "uploads", "templates");
fs.mkdirSync(UP_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UP_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safe = file.fieldname + "-" + Date.now() + ext;
    cb(null, safe);
  },
});
const upload = multer({ storage });

router.get("/", async (_req, res) => {
  const [rows] = await db.query(
    "SELECT id, templateName, templateKey, description, createdAt, preview_image_url, is_active FROM templates ORDER BY createdAt DESC"
  );
  res.json(rows);
});

// ---------- CREATE (admin only, multipart) ----------
router.post("/", verifyToken, upload.single("previewImage"), async (req, res) => {
  try {
    const admin = await isAdmin(req.user.id);
    if (!admin) return res.status(403).json({ error: "Not authorized" });

    const { templateName = "", description = "" } = req.body || {};
    const is_active = 1;

    const preview_image_url = req.file
      ? `/uploads/templates/${req.file.filename}`
      : "";

    const [r] = await db.query(
      "INSERT INTO templates (templateName, description, preview_image_url, is_active) VALUES (?, ?, ?, ?)",
      [templateName, description, preview_image_url, is_active]
    );

    res.status(201).json({
      id: r.insertId,
      templateName,
      description,
      preview_image_url,
      is_active,
    });
  } catch (err) {
    console.error("Failed to create template", err);
    res.status(500).json({ error: "Failed to create template" });
  }
});

// ---------- UPDATE (admin only) ----------
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const admin = await isAdmin(req.user.id);
    if (!admin) return res.status(403).json({ error: "Not authorized" });

    const { templateName, description, preview_image_url, is_active } = req.body;

    await db.query(
      "UPDATE templates SET templateName=?, description=?, preview_image_url=?, is_active=? WHERE id=?",
      [
        templateName,
        description,
        preview_image_url ?? "",
        is_active ?? 1,
        req.params.id,
      ]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("Failed to update template", err);
    res.status(500).json({ error: "Failed to update template" });
  }
});

// ---------- DELETE (admin only) ----------
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const admin = await isAdmin(req.user.id);
    if (!admin) return res.status(403).json({ error: "Not authorized" });

    await db.query("DELETE FROM templates WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete template", err);
    res.status(500).json({ error: "Failed to delete template" });
  }
});

module.exports = router;
