const db = require("../Database/db");

module.exports = async function requireAdmin(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const [rows] = await db.query("SELECT role FROM users WHERE id=? LIMIT 1", [userId]);
    const role = String(rows?.[0]?.role || "").toLowerCase();

    if (role !== "admin") return res.status(403).json({ error: "Not authorized" });
    next();
  } catch (err) {
    console.error("[requireAdmin]", err);
    res.status(500).json({ error: "Server error" });
  }
};
