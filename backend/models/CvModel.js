// backend/models/CvModel.js
const db = require('../Database/db');

class CvModel {
  static async create({ userId, templateId, title }) {
    const [r] = await db.execute(
      `INSERT INTO cvs (userId, templateId, title) VALUES (?, ?, ?)`,
      [userId, templateId, title]
    );
    return r.insertId;
  }

  static async findById(cvId) {
    const [[row]] = await db.execute(`SELECT * FROM cvs WHERE id = ?`, [cvId]);
    return row;
  }

  static async findByUser(userId) {
    const [rows] = await db.execute(
      // prefer updated_at if present, otherwise createdAt
      `SELECT * FROM cvs
        WHERE userId = ?
        ORDER BY COALESCE(updated_at, createdAt) DESC, id DESC`,
      [userId]
    );
    return rows;
  }

  static async delete(cvId) {
    const [r] = await db.execute(`DELETE FROM cvs WHERE id = ?`, [cvId]);
    return r.affectedRows;
  }

  /** Returns the CV row joined with template; ensures the user owns this CV. */
  static async assertOwned(cvId, userId) {
    const [rows] = await db.execute(
      `SELECT c.id, c.userId, c.templateId, c.title,
              t.templateName, t.description
         FROM cvs c
         LEFT JOIN templates t ON t.id = c.templateId
        WHERE c.id = ? AND c.userId = ?`,
      [cvId, userId]
    );
    return rows[0] || null; // null means not found / not owned
  }
}

module.exports = CvModel;
