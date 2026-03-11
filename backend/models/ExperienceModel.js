// backend/models/ExperienceModel.js
const db = require('../Database/db');
const toNull = (v) => (v === undefined ? null : v);
const assertNoUndefined = (a, where) => {
  if (a.some(v => v === undefined)) throw new Error(`[BindError] undefined in ${where}`);
};

module.exports = class Experience {
  static async create(body) {
    const cvId       = Number(body.cvId ?? body.cvid);
    const company    = body.company ?? null;
    const position   = body.position ?? null;
    const city       = body.city ?? null;
    const startDate  = body.startDate ?? null; // DATE or null
    const endDate    = body.endDate ?? null;
    const description= body.description ?? null;

    if (!Number.isFinite(cvId)) throw new Error('cvId required for experience');

    const params = [cvId, toNull(company), toNull(position), toNull(city), toNull(startDate), toNull(endDate), toNull(description)];
    assertNoUndefined(params, 'experience.create');

    const [r] = await db.execute(
      `INSERT INTO experiences (cvId, company, position, city, startDate, endDate, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      params
    );
    return r.insertId;
  }

  static async findByCv(cvId) {
    const [rows] = await db.execute(
      `SELECT * FROM experiences WHERE cvId = ? ORDER BY startDate IS NULL, startDate DESC, id DESC`, [Number(cvId)]
    );
    return rows;
  }

  static async update(id, body) {
    const fields = [];
    const values = [];

    for (const [k, col] of Object.entries({
      company: 'company',
      position: 'position',
      city: 'city',
      startDate: 'startDate',
      endDate: 'endDate',
      description: 'description',
    })) {
      if (k in body) { fields.push(`${col} = ?`); values.push(toNull(body[k])); }
    }
    if (!fields.length) return this.findById?.(id) || null;

    values.push(Number(id));
    const sql = `UPDATE experiences SET ${fields.join(', ')} WHERE id = ?`;
    const [r] = await db.execute(sql, values);
    if (!r.affectedRows) return null;

    const [[row]] = await db.execute(`SELECT * FROM experiences WHERE id = ?`, [Number(id)]);
    return row;
  }

  static async delete(id) {
    const [r] = await db.execute(`DELETE FROM experiences WHERE id = ?`, [Number(id)]);
    return r.affectedRows > 0;
  }
};
