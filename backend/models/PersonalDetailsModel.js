// backend/models/PersonalDetailsModel.js
const db = require('../Database/db');

// Cache the detected column names once
let COLS = null;

async function detectColumns() {
  if (COLS) return COLS;

  const [rows] = await db.execute(
    `SELECT COLUMN_NAME
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'personaldetails'`
  );
  const have = new Set(rows.map(r => r.COLUMN_NAME));

  // Pick the actual column names that exist in your DB
  const pick = (...candidates) => candidates.find(c => have.has(c)) || null;

  // cv id col may be: cvid, cvId, cv_id
  const cvCol        = pick('cvid', 'cvId', 'cv_id');

  // names can be snake or camel in different dumps
  const firstNameCol = pick('first_name', 'firstName');
  const lastNameCol  = pick('last_name',  'lastName');

  // phone variants
  const phoneCol     = pick('phone_number', 'phoneNumber', 'phone');

  // zip variants
  const zipCol       = pick('zip_code', 'zipCode', 'zipcode', 'zip');

  // city variants
  const cityCol      = pick('city', 'city_town', 'cityTown');

  // address is usually consistent
  const addressCol   = pick('address');

  // email is usually consistent
  const emailCol     = pick('email');

  COLS = {
    table: 'personaldetails',
    idCol: pick('id'), // optional
    cvCol,
    firstNameCol,
    lastNameCol,
    emailCol,
    phoneCol,
    addressCol,
    zipCol,
    cityCol,
    have,
  };

  if (!cvCol) {
    throw new Error("personaldetails table: couldn't find CV id column (tried cvid, cvId, cv_id)");
  }
  return COLS;
}

// Normalize incoming request body keys to your actual DB columns.
// Accept BOTH snake_case and camelCase inputs safely.
function mapInputToColumns(input, C) {
  const out = {};

  // helper to copy first non-empty value from a list of aliases
  const copy = (colName, ...aliases) => {
    if (!colName) return;
    for (const a of aliases) {
      if (a in input && input[a] !== undefined && input[a] !== null) {
        out[colName] = input[a];
        return;
      }
    }
  };

  // cv id can arrive as cvId or cvid in payload
  copy(C.cvCol, 'cvId', 'cvid', 'cv_id', 'CVId', 'CvId');

  copy(C.firstNameCol, 'first_name', 'firstName');
  copy(C.lastNameCol,  'last_name',  'lastName');
  copy(C.emailCol,     'email');

  copy(C.phoneCol,     'phone_number', 'phoneNumber', 'phone');
  copy(C.addressCol,   'address');
  copy(C.zipCol,       'zip_code', 'zipCode', 'zipcode', 'zip');
  copy(C.cityCol,      'city', 'city_town', 'cityTown');

  return out;
}

// Build SET clause safely (skip undefined)
function buildSetClause(obj) {
  const cols = Object.keys(obj);
  if (!cols.length) return { sql: '', vals: [] };
  const parts = cols.map(c => `${c} = ?`);
  const vals  = cols.map(c => obj[c]);
  return { sql: parts.join(', '), vals };
}

class PersonalDetailsModel {
  // INSERT (or update via controller's upsert)
  static async create(input) {
    const C = await detectColumns();
    const data = mapInputToColumns(input, C);

    // Ensure we have the cv id value
    if (data[C.cvCol] == null) {
      throw new Error('cvId (or cvid) is required for personaldetails.create');
    }

    // Only insert columns that actually exist and are provided
    const cols = Object.keys(data);
    const vals = cols.map(k => data[k]);

    const placeholders = cols.map(() => '?').join(', ');
    const sql = `INSERT INTO ${C.table} (${cols.join(', ')}) VALUES (${placeholders})`;

    const [r] = await db.execute(sql, vals);
    return r.insertId;
  }

  // SELECT by cv id
  static async findByCv(cvId) {
    const C = await detectColumns();
    const [rows] = await db.execute(
      `SELECT * FROM ${C.table} WHERE ${C.cvCol} = ? LIMIT 1`,
      [cvId]
    );
    return rows[0] || null;
  }

  // UPDATE by cv id (only provided fields)
  static async update(cvId, input) {
    const C = await detectColumns();
    const data = mapInputToColumns(input, C);

    // Never try to update the cv-id column itself here
    delete data[C.cvCol];

    const { sql, vals } = buildSetClause(data);
    if (!sql) {
      // nothing to update; just return current row
      return this.findByCv(cvId);
    }

    const fullSql = `UPDATE ${C.table} SET ${sql} WHERE ${C.cvCol} = ?`;
    await db.execute(fullSql, [...vals, cvId]);
    return this.findByCv(cvId);
  }
}

module.exports = PersonalDetailsModel;
