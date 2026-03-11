// backend/routes/authRoutes.js
const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

const db = require("../Database/db");

// resolve the controller path explicitly (with extension)
const controllerPath = path.resolve(
  __dirname,
  "../controllers/authController.js"
);
console.log(
  "[ROUTES] loading controller from:",
  controllerPath,
  "exists:",
  fs.existsSync(controllerPath)
);

const authController = require(controllerPath);
const verifyToken = require("../middleware/verifyToken");

// Show exactly what we imported
console.log("[ROUTES] authController keys:", Object.keys(authController || {}));
console.log(
  "[ROUTES] register type:",
  typeof authController?.register,
  "login type:",
  typeof authController?.login
);

// Safe wrapper so server never crashes if a handler is missing
const safe = (fnName) => {
  const fn = authController && authController[fnName];
  if (typeof fn === "function") return fn;
  return (_req, res) => {
    console.error(`[ROUTES] Handler "${fnName}" is not a function. Got:`, fn);
    res
      .status(500)
      .json({ error: `Server misconfigured: handler "${fnName}" missing` });
  };
};

// Router-level logger
router.use((req, _res, next) => {
  console.log("[AUTH ROUTER]", req.method, req.path);
  next();
});

// ---------------- AUTH ----------------
router.post("/register", safe("register"));
router.post("/login", safe("login"));

// NEW: Forgot / Reset password
router.post("/forgot-password", safe("forgotPassword"));
router.post("/reset-password", safe("resetPassword"));

// NEW: Change password (logged in)
router.post("/change-password", verifyToken, safe("changePassword"));

// ---------------- PROFILE ----------------
router.get("/me", verifyToken, async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, fullName, email, role FROM users WHERE id = ? LIMIT 1",
    [req.user.id]
  );
  if (!rows.length) return res.status(404).json({ error: "Not found" });
  res.json({ user: rows[0] });
});

router.put("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // prej front-it mundesh me dërgu veç këto fusha
    const { fullName } = req.body;

    if (!fullName) {
      return res.status(400).json({ error: "Emri nuk mund të jetë bosh." });
    }

    await db.query("UPDATE users SET fullName = ? WHERE id = ?", [
      fullName,
      userId,
    ]);

    // kthe user-in e përditësuar
    const [rows] = await db.query(
      "SELECT id, fullName, email, role FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ user: rows[0], message: "Profile updated" });
  } catch (err) {
    console.error(
      "[UPDATE /me ERROR]",
      err.code || "",
      err.sqlMessage || err.message
    );
    res.status(500).json({ error: "Gabim në server" });
  }
});

module.exports = router;
