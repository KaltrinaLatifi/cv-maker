const db = require('../Database/db');
const toNull = (v) => (v === undefined ? null : v);

module.exports = class Interest {
  static async create(body) {
    const cvId = Number(body.cvId ?? body.cvid);
    if (!Number.isFinite(cvId)) throw new Error('cvId required for interest');

    // accept both, but ALWAYS write to the real column: hobby
    const hobby = toNull(body.hobby ?? body.Hoby);

    const params = [cvId, hobby];
    if (params.some(v => v === undefined)) {
      throw new Error('[BindError] undefined in interests.create');
    }

    // real column name is "hobby"
    const [r] = await db.execute(
      `INSERT INTO interests (cvId, hobby) VALUES (?, ?)`,
      params
    );
    return r.insertId;
  }

  static async findByCv(cvId) {
    const [rows] = await db.execute(
      `SELECT * FROM interests WHERE cvId = ? ORDER BY id DESC`,
      [Number(cvId)]
    );
    return rows;
  }

  static async update(id, body) {
    const hobby = toNull(body.hobby ?? body.Hoby);
    if (hobby === undefined) {
      const [[row]] = await db.execute(
        `SELECT * FROM interests WHERE id = ?`,
        [Number(id)]
      );
      return row || null;
    }
    // real column name is "hobby"
    const [r] = await db.execute(
      `UPDATE interests SET hobby = ? WHERE id = ?`,
      [hobby, Number(id)]
    );
    if (!r.affectedRows) return null;

    const [[row]] = await db.execute(
      `SELECT * FROM interests WHERE id = ?`,
      [Number(id)]
    );
    return row;
  }

  static async delete(id) {
    const [r] = await db.execute(
      `DELETE FROM interests WHERE id = ?`,
      [Number(id)]
    );
    return r.affectedRows > 0;
  }
};
