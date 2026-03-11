// //backend\routes\contact.js
// const express = require("express");
// const router = express.Router();
// const db = require("../Database/db");

// // User sends message
// router.post("/contact", (req, res) => {
//   const { userId, name, email, subject, message } = req.body;

//   if (!userId || !name || !email || !message) {
//     return res.status(400).json({ error: "Required fields missing" });
//   }

//   const sql = `
//     INSERT INTO contact (userId, name, email, subject, message)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(sql, [userId, name, email, subject, message], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Message sent ✅" });
//   });
// });

// // Admin gets all messages
// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM contact ORDER BY created_at DESC";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

// // Admin views one message
// router.get("/admin/contact/:id", (req, res) => {
//   const sql = "SELECT * FROM contact WHERE id = ?";
//   db.query(sql, [req.params.id], (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results[0]);
//   });
// });

// module.exports = router;
