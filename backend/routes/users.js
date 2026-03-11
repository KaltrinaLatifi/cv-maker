// backend/routes/users.js
const express = require("express");
const router = express.Router();
const db = require("../Database/db");
const verifyToken = require("../middleware/verifyToken");

// thjesht kontrollojmë kolonën `role`
async function isAdmin(userId) {
  const [rows] = await db.query(
    "SELECT role FROM users WHERE id = ? LIMIT 1",
    [userId]
  );

  const u = rows[0];
  if (!u) return false;

  const roleStr = String(u.role || "").toLowerCase();
  return roleStr === "admin";
}

// GET /api/users  (vetëm admin)
router.get("/", verifyToken, async (req, res) => {
  try {
    const admin = await isAdmin(req.user.id);
    if (!admin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const [rows] = await db.query(
      "SELECT `id`, `fullName`, `email`, `role`, `createdAt` FROM users ORDER BY `createdAt` DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch users", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// PUT /api/users/:id/role  (admin ndryshon rolin)
router.put("/:id/role", verifyToken, async (req, res) => {
  try {
    const admin = await isAdmin(req.user.id);
    if (!admin) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const userId = req.params.id;
    const { role } = req.body; // "admin" ose "user"

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    await db.query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
    res.json({ message: "Role updated", userId, role });
  } catch (err) {
    console.error("Failed to update user role", err);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

module.exports = router;
