// backend/routes/resumes.js
const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const verifyToken = require("../middleware/verifyToken");

function parseJson(val) {
  try {
    return val ? JSON.parse(val) : {};
  } catch {
    return {};
  }
}

/* ---------- health ---------- */
router.get("/_ping", (_req, res) =>
  res.json({ ok: true, where: "resumes router" })
);

router.use(verifyToken);

router.get("/by-title/:title", async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM resumes WHERE title = ? LIMIT 1",
      [req.params.title]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    const r = rows[0];
    r.data_json = parseJson(r.data_json);
    res.json(r);
  } catch (e) {
    next(e);
  }
});



/* ---------- CREATE ---------- */
router.post("/", async (req, res, next) => {
  try {
    const {
      title = "Untitled",
      templateId = null,
      dataJson = {},
      schemaVersion = 1,
    } = req.body || {};

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const [result] = await db.query(
      `INSERT INTO resumes (user_id, template_id, title, data_json, schema_version)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, templateId, title, JSON.stringify(dataJson), schemaVersion]
    );

    res.status(201).json({ id: result.insertId });
  } catch (e) {
    next(e);
  }
});

/* ---------- READ (owner only) ---------- */
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT * FROM resumes WHERE id = ? AND user_id = ?",
      [req.params.id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    const r = rows[0];
    r.data_json = parseJson(r.data_json);
    res.json(r);
  } catch (e) {
    next(e);
  }
});

/* ---------- UPDATE (owner only) ---------- */
router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      title = null,
      templateId = null,
      dataJson = {},
      schemaVersion = 1,
    } = req.body || {};

    const [result] = await db.query(
      `UPDATE resumes 
       SET title = COALESCE(?, title),
           template_id = COALESCE(?, template_id),
           data_json = ?,
           schema_version = ?
       WHERE id = ? AND user_id = ?`,
      [
        title,
        templateId,
        JSON.stringify(dataJson),
        schemaVersion,
        req.params.id,
        userId,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

/* ---------- PATCH (owner only) ---------- */
router.patch("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { patch = {} } = req.body || {};

    const [rows] = await db.query(
      "SELECT data_json FROM resumes WHERE id = ? AND user_id = ?",
      [req.params.id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    const current = parseJson(rows[0].data_json);
    const updated = { ...current, ...patch };

    const [result] = await db.query(
      "UPDATE resumes SET data_json = ? WHERE id = ? AND user_id = ?",
      [JSON.stringify(updated), req.params.id, userId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });

    res.json({ ok: true, data_json: updated });
  } catch (e) {
    next(e);
  }
});

/* ---------- DELETE (optional, owner only) ---------- */
router.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [result] = await db.query(
      "DELETE FROM resumes WHERE id = ? AND user_id = ?",
      [req.params.id, userId]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
