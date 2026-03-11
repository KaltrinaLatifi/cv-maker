// backend/controllers/authController.js
const db = require("../Database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../utils/mailer");

const JWT_SECRET = process.env.JWT_SECRET;

// Comma-separated emails that should be admins
const ADMIN_EMAILS = new Set(
  String(process.env.ADMIN_EMAILS || "admin@example.com")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

console.log(
  "[AUTHCONTROLLER] loaded, ADMIN_EMAILS:",
  [...ADMIN_EMAILS].join(", ")
);

function sha256Hex(str) {
  return crypto.createHash("sha256").update(String(str)).digest("hex");
}

function makeResetToken() {
  return crypto.randomBytes(32).toString("hex"); // 64 chars
}

// ---------------- register ----------------
async function register(req, res) {
  try {
    let { fullName, email, password } = req.body;
    fullName = String(fullName || "").trim();
    email = String(email || "")
      .trim()
      .toLowerCase();
    password = String(password || "");

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Plotëso të gjitha fushat!" });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email ekziston tashmë!" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (fullName, email, passwordHash, role) VALUES (?, ?, ?, 'user')",
      [fullName, email, hashed]
    );

    return res.status(201).json({
      message: "User i regjistruar me sukses!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error(
      "[REGISTER ERROR]",
      error.code,
      error.sqlMessage || error.message
    );
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email ekziston tashmë!" });
    }
    return res.status(500).json({ error: "Gabim në server" });
  }
}

// ---------------- login ----------------
async function login(req, res) {
  try {
    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ error: "Server misconfigured (JWT_SECRET missing)" });
    }

    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({ error: "Plotëso të gjitha fushat!" });
    }

    const wantAdmin = ADMIN_EMAILS.has(email);

    // 1) Try to find existing user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    let user = rows[0] || null;
    let skipCompare = false;

    // 2) If not found and email is in ADMIN_EMAILS, auto-create using the typed password
    if (!user && wantAdmin) {
      console.log("[LOGIN] Auto-creating admin user:", email);
      const hashed = await bcrypt.hash(password, 10);

      // Upsert to avoid race conditions
      await db.query(
        `INSERT INTO users (fullName, email, passwordHash)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE fullName = VALUES(fullName)`,
        ["Administrator", email, hashed]
      );

      const [rows2] = await db.query(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      user = rows2[0] || null;
      skipCompare = true; // we just set the password
    }

    // 3) Still not found? -> invalid
    if (!user) {
      return res.status(400).json({ error: "Email ose password gabim!" });
    }

    // 4) If we didn’t just create the user, verify password
    if (!skipCompare) {
      if (
        typeof user.passwordHash !== "string" ||
        user.passwordHash.length === 0
      ) {
        return res.status(400).json({ error: "Email ose password gabim!" });
      }
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        return res.status(400).json({ error: "Email ose password gabim!" });
      }
    }

    // 5) Sign JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // 6) Role
    const isAdmin =
      wantAdmin ||
      String(user.role).toLowerCase() === "admin" ||
      user.isAdmin === 1 ||
      String(user.role) === "1";
    const roleStr = isAdmin ? "admin" : "user";

    return res.json({
      message: "Login i suksesshëm!",
      token,
      role: roleStr,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: roleStr,
      },
    });
  } catch (err) {
    console.error(
      "[LOGIN ERROR]",
      err.code || "",
      err.sqlMessage || err.message
    );
    return res.status(500).json({ error: "Gabim në server" });
  }
}

// ---------------- forgot password ----------------
async function forgotPassword(req, res) {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Always respond OK (avoid leaking whether user exists)
    const genericResponse = () =>
      res.json({
        ok: true,
        message:
          "Nëse email ekziston, do të pranosh një link për ndryshim të password-it.",
      });

    const [rows] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = rows[0];
    if (!user) return genericResponse();

    const token = makeResetToken();
    const tokenHash = sha256Hex(token);
    const minutes = Number(process.env.RESET_TOKEN_MINUTES || 30);
    const expires = new Date(Date.now() + minutes * 60 * 1000);

    await db.query(
      "UPDATE users SET passwordResetTokenHash=?, passwordResetExpires=?, passwordResetUsedAt=NULL WHERE id=?",
      [tokenHash, expires, user.id]
    );

    const frontend = (
      process.env.FRONTEND_URL || "http://localhost:5173"
    ).replace(/\/$/, "");

    const link = `${frontend}/reset-password?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`;

    await sendPasswordResetEmail({
      to: email,
      resetLink: link,
      expiresMinutes: minutes,
    });

    return genericResponse();
  } catch (err) {
    console.error("[FORGOT PASSWORD]", err);
    return res.json({
      ok: true,
      message:
        "Nëse email ekziston, do të pranosh një link për ndryshim të password-it.",
    });
  }
}

// ---------------- reset password ----------------
async function resetPassword(req, res) {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const token = String(req.body?.token || "").trim();
    const newPassword = String(req.body?.newPassword || "");

    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password duhet të ketë së paku 6 karaktere." });
    }

    const [rows] = await db.query("SELECT * FROM users WHERE email=? LIMIT 1", [
      email,
    ]);
    const user = rows[0];
    if (!user) return res.status(400).json({ error: "Link invalid" });

    if (
      !user.passwordResetTokenHash ||
      !user.passwordResetExpires ||
      user.passwordResetUsedAt
    ) {
      return res.status(400).json({ error: "Link invalid" });
    }

    if (new Date() > new Date(user.passwordResetExpires)) {
      return res.status(400).json({ error: "Link i skaduar" });
    }

    if (sha256Hex(token) !== user.passwordResetTokenHash) {
      return res.status(400).json({ error: "Link invalid" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE users SET passwordHash=?, passwordResetTokenHash=NULL, passwordResetExpires=NULL, passwordResetUsedAt=NOW() WHERE id=?",
      [hashed, user.id]
    );

    return res.json({ ok: true, message: "Password u ndryshua me sukses" });
  } catch (err) {
    console.error("[RESET PASSWORD]", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// ---------------- change password (logged-in) ----------------
async function changePassword(req, res) {
  try {
    const userId = req.user?.id;
    const currentPassword = String(req.body?.currentPassword || "");
    const newPassword = String(req.body?.newPassword || "");

    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password duhet të ketë së paku 6 karaktere." });
    }

    const [rows] = await db.query("SELECT passwordHash FROM users WHERE id=?", [
      userId,
    ]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    const ok = await bcrypt.compare(currentPassword, user.passwordHash || "");
    if (!ok) {
      return res.status(401).json({ error: "Current password gabim" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET passwordHash=? WHERE id=?", [
      hashed,
      userId,
    ]);

    return res.json({ ok: true, message: "Password u ndryshua" });
  } catch (err) {
    console.error("[CHANGE PASSWORD]", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};
