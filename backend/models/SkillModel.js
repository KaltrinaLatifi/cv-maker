// backend/models/SkillModel.js
const db = require('../Database/db');
const toNull = (v) => (v === undefined ? null : v);

module.exports = class Skill {
  static async create(body) {
    const cvId = Number(body.cvId ?? body.cvid);
    if (!Number.isFinite(cvId)) throw new Error('cvId required for skill');

    const skillName = toNull(body.skillName ?? body.skill);
    const level     = toNull(body.level);

    const params = [cvId, skillName, level];
    if (params.some(v => v === undefined)) throw new Error('[BindError] undefined in skills.create');

    const [r] = await db.execute(
      `INSERT INTO skills (cvId, skillName, level) VALUES (?, ?, ?)`,
      params
    );
    return r.insertId;
  }

  static async findByCv(cvId) {
    const [rows] = await db.execute(`SELECT * FROM skills WHERE cvId = ? ORDER BY id DESC`, [Number(cvId)]);
    return rows;
  }

  static async update(id, body) {
    const sets = [], vals = [];
    if ('skillName' in body || 'skill' in body) { sets.push('skillName = ?'); vals.push(toNull(body.skillName ?? body.skill)); }
    if ('level' in body)                           { sets.push('level = ?');     vals.push(toNull(body.level)); }
    if (!sets.length) {
      const [[row]] = await db.execute(`SELECT * FROM skills WHERE id = ?`, [Number(id)]);
      return row || null;
    }
    vals.push(Number(id));
    const [r] = await db.execute(`UPDATE skills SET ${sets.join(', ')} WHERE id = ?`, vals);
    if (!r.affectedRows) return null;
    const [[row]] = await db.execute(`SELECT * FROM skills WHERE id = ?`, [Number(id)]);
    return row;
  }

  static async delete(id) {
    const [r] = await db.execute(`DELETE FROM skills WHERE id = ?`, [Number(id)]);
    return r.affectedRows > 0;
  }
};
