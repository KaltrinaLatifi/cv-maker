//backend\routes\manageCv.js
const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const verifyToken = require("../middleware/verifyToken");
const requireAdmin = require("../middleware/requireAdmin");
router.use(verifyToken, requireAdmin);

// GET /api/managecv - Fetch all CVs
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        cvs.id,
        cvs.title AS cvTitle,
        users.fullName AS userName,
        templates.templateName AS templateName,
        cvs.createdAt
      FROM cvs
      LEFT JOIN users ON cvs.userId = users.id
      LEFT JOIN templates ON cvs.templateId = templates.id
      ORDER BY cvs.createdAt DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching CVs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/managecv/:id - View single CV details
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT 
        cvs.id,
        cvs.title AS cvTitle,
        cvs.createdAt,
        cvs.updated_at,
        users.fullName AS userName,
        users.email,
        templates.templateName AS templateName,
        templates.description AS templateDescription
      FROM cvs
      LEFT JOIN users ON cvs.userId = users.id
      LEFT JOIN templates ON cvs.templateId = templates.id
      WHERE cvs.id = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "CV not found" });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching CV details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/managecv/:id - Delete CV
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM cvs WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "CV not found" });
    res.json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error("Error deleting CV:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
