// backend/models/EducationModel.js
const db = require('../Database/db');
const toNull = (v) => (v === undefined ? null : v);

module.exports = class Education {
  static async create(body) {
    const cvId       = Number(body.cvId ?? body.cvid);
    if (!Number.isFinite(cvId)) throw new Error('cvId required for education');

    const school     = toNull(body.school);
    const degree     = toNull(body.degree);
    const city       = toNull(body.city);
    const startDate  = toNull(body.startDate);
    const endDate    = toNull(body.endDate);
    const description= toNull(body.description);

    const params = [cvId, school, degree, city, startDate, endDate, description];
    if (params.some(v => v === undefined)) throw new Error('[BindError] undefined in education.create');

    const [r] = await db.execute(
      `INSERT INTO education (cvId, school, degree, city, startDate, endDate, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      params
    );
    return r.insertId;
  }

  static async findByCv(cvId) {
    const [rows] = await db.execute(
      `SELECT * FROM education WHERE cvId = ? ORDER BY startDate IS NULL, startDate DESC, id DESC`, [Number(cvId)]
    );
    return rows;
  }

  static async update(id, body) {
    const map = { school:'school', degree:'degree', city:'city', startDate:'startDate', endDate:'endDate', description:'description' };
    const sets = [], vals = [];
    for (const [k,col] of Object.entries(map)) {
      if (k in body) { sets.push(`${col} = ?`); vals.push(toNull(body[k])); }
    }
    if (!sets.length) {
      const [[row]] = await db.execute(`SELECT * FROM education WHERE id = ?`, [Number(id)]);
      return row || null;
    }
    vals.push(Number(id));
    const [r] = await db.execute(`UPDATE education SET ${sets.join(', ')} WHERE id = ?`, vals);
    if (!r.affectedRows) return null;
    const [[row]] = await db.execute(`SELECT * FROM education WHERE id = ?`, [Number(id)]);
    return row;
  }

  static async delete(id) {
    const [r] = await db.execute(`DELETE FROM education WHERE id = ?`, [Number(id)]);
    return r.affectedRows > 0;
  }
};
