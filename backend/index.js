// backend/index.js
require("dotenv").config();

process.on("unhandledRejection", (reason) => {
  console.error("[UNHANDLED REJECTION]", reason?.stack || reason);
});
process.on("uncaughtException", (err) => {
  console.error("[UNCAUGHT EXCEPTION]", err?.stack || err);
});

console.log("[BOOT] JWT_SECRET length:", (process.env.JWT_SECRET || "").length);

const express = require("express");
const cors = require("cors");

const pool = require("./Database/db");
const authRoutes = require("./routes/authRoutes");
const cvRoutes = require("./routes/CvRoutes");
const resumesRouter = require("./routes/resumes");
const templatesRoutes = require("./routes/templates");
const usersRouter = require("./routes/users");
const manageCvRoutes = require("./routes/manageCv");
const ContactRoutes = require("./routes/ContactRoutes");
const templateRequestsRoutes = require("./routes/templateRequests");

const app = express();

const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    // optional cache headers for images
    setHeaders: (res, filePath) => {
      if (/\.(png|jpe?g|gif|webp|svg)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

const PORT = Number(process.env.PORT || 4000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Core middleware
app.use(
  cors({
    origin: CLIENT_ORIGIN === "*" ? true : CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// <--- MOVE THESE ABOVE ROUTES
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  console.log("[REQ]", req.method, req.originalUrl);
  next();
});

// Health
app.get("/", (_req, res) => res.send("Hello from backend!"));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Quick DB test
app.get("/test-db", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes

// OLD paths for your existing frontend:
//   POST /api/register
//   POST /api/login
//   GET  /api/me
app.use("/api", authRoutes);

// NEW nicer paths for Postman / future:
//   POST /api/auth/register
//   POST /api/auth/login
//   GET  /api/auth/me
app.use("/api/auth", authRoutes);

app.use("/api/cv", cvRoutes);
app.use("/api/resumes", resumesRouter);
app.use("/api/templates", templatesRoutes);
app.use("/api/template-requests", templateRequestsRoutes);
app.use("/api/managecv", manageCvRoutes);
app.use("/api/users", usersRouter);
app.use("/api/contact", ContactRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error("[ERR]", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Start
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
  if (CLIENT_ORIGIN !== "*")
    console.log(`CORS origin allowed: ${CLIENT_ORIGIN}`);
});
