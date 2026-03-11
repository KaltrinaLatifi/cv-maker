// backend/utils/mailer.js
"use strict";

const nodemailer = require("nodemailer");

/**
 * Reads env + validates required mail settings.
 * NOTE: MAIL_PASS must be a Gmail App Password (16 chars) if using Gmail SMTP.
 */
function getMailConfig() {
  const cfg = {
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT || 465),
    secure: String(process.env.MAIL_SECURE || "true").toLowerCase() === "true",
    user: (process.env.MAIL_USER || "").trim(),
    pass: (process.env.MAIL_PASS || "").trim(),
    to: (process.env.MAIL_TO || "").trim(),
    fromName: (process.env.MAIL_FROM_NAME || "CV Maker").trim(),
  };

  // Basic validation (helps you see real problems early)
  if (!cfg.user) throw new Error("MAIL_USER is missing in .env");
  if (!cfg.pass) throw new Error("MAIL_PASS is missing in .env");
  if (!cfg.to) throw new Error("MAIL_TO is missing in .env");

  return cfg;
}

/** Build a formatted "From" header. */
function formatFrom(fromName, email) {
  const safeName = String(fromName || "").replace(/"/g, "'");
  return safeName ? `"${safeName}" <${email}>` : email;
}

/** Create transporter (cached). */
let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const cfg = getMailConfig();

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
  });

  cachedTransporter = transporter;
  return transporter;
}

/**
 * Verify SMTP connection + login.
 * Call this once on boot (optional) or when debugging.
 */
async function verifyMailer() {
  const cfg = getMailConfig();
  const transporter = getTransporter();

  await transporter.verify();
  return {
    ok: true,
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    user: cfg.user,
  };
}

/**
 * Send "template request" email to a fixed inbox (MAIL_TO),
 * while each developer can have their own MAIL_USER/PASS.
 */
async function sendTemplateRequestEmail({
  requestId,
  templateName,
  description,
  fileUrl,
}) {
  const cfg = getMailConfig();
  const transporter = getTransporter();

  const subject = `New Template Request #${requestId}: ${
    templateName || "(no name)"
  }`;

  const text = [
    "A new CV template request was submitted.",
    "",
    `Request ID: ${requestId ?? "-"}`,
    `Template Name: ${templateName || "-"}`,
    "",
    "Description:",
    description ? String(description) : "-",
    "",
    "Inspiration File:",
    fileUrl ? String(fileUrl) : "-",
    "",
  ].join("\n");

  // Helpful debug (safe: doesn't print password)
  console.log("[MAIL] FROM:", cfg.user);
  console.log("[MAIL] TO:", cfg.to);
  console.log(
    "[MAIL] HOST:",
    cfg.host,
    "PORT:",
    cfg.port,
    "SECURE:",
    cfg.secure
  );

  try {
    // Ensures auth works; if it fails you'll see EAUTH, etc.
    await transporter.verify();

    const info = await transporter.sendMail({
      from: formatFrom(cfg.fromName, cfg.user),
      to: cfg.to,
      subject,
      text,
    });

    console.log("[MAIL] sent OK:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return { ok: true, info };
  } catch (err) {
    // Print the real reason
    console.error("[MAIL] ERROR:", {
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
      message: err.message,
    });
    throw err;
  }
}

async function sendPasswordResetEmail({ to, resetLink, expiresMinutes }) {
  const cfg = getMailConfig();
  const transporter = getTransporter();

  const subject = "Reset your CV Maker password";

  const text = [
    "Kërkesa për ndryshim të password-it u pranua.",
    "",
    `Kliko këtë link brenda ${expiresMinutes} minutave:`,
    resetLink,
    "",
    "Nëse ti nuk e ke kërku këtë, mund ta injorosh këtë email.",
  ].join("\n");

  await transporter.verify();

  const info = await transporter.sendMail({
    from: formatFrom(cfg.fromName, cfg.user),
    to: String(to).trim(), // 👈 KËTU shkon EMAIL-i i USER-it
    subject,
    text,
  });

  console.log("[MAIL][RESET PASSWORD] sent:", {
    to,
    messageId: info.messageId,
  });

  return { ok: true, info };
}

module.exports = {
  getTransporter,
  verifyMailer,
  sendTemplateRequestEmail,
  sendPasswordResetEmail,
};
