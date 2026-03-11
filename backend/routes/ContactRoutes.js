//backend\routes\ContactRoutes.js
const express = require("express");
const router = express.Router();
const pool = require("../Database/db");
const verifyToken = require("../middleware/verifyToken");
const requireAdmin = require("../middleware/requireAdmin");


router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM contact ORDER BY createdAt DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("[CONTACT GET ALL]", error);
    res.status(500).json({ error: "Database error" });
  }
});
 
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    await pool.query(
      `INSERT INTO contact (userId, name, email, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [null, name, email, subject || null, message]
    );

    res.json({ message: "Message sent!" });
  } catch (error) {
    console.error("[CONTACT POST]", error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM contact WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("[CONTACT GET ONE]", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;