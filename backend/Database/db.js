// backend/Database/db.js
require("dotenv").config();
const mysql = require("mysql2/promise");

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const SHOULD_LOG =
  String(process.env.DEBUG_SQL ?? "true").toLowerCase() === "true";
const oneLine = (s) => String(s).replace(/\s+/g, " ").trim();

// Wrap an object's execute/query to log SQL + params
function wrapExec(obj, label) {
  if (typeof obj.execute === "function") {
    const orig = obj.execute.bind(obj);
    obj.execute = async (...args) => {
      if (SHOULD_LOG)
        console.log(`[DB:${label}.execute]`, oneLine(args[0]), args[1] || []);
      try {
        return await orig(...args);
      } catch (e) {
        console.error(
          `[DB:${label}.ERROR]`,
          e.code || e.errno || "",
          e.message
        );
        throw e;
      }
    };
  }
  if (typeof obj.query === "function") {
    const origQ = obj.query.bind(obj);
    obj.query = async (...args) => {
      if (SHOULD_LOG)
        console.log(`[DB:${label}.query]`, oneLine(args[0]), args[1] || []);
      try {
        return await origQ(...args);
      } catch (e) {
        console.error(
          `[DB:${label}.ERROR]`,
          e.code || e.errno || "",
          e.message
        );
        throw e;
      }
    };
  }
}

// Wrap the pool
wrapExec(pool, "pool");

// Also wrap connections returned by getConnection (just in case)
const origGet = pool.getConnection.bind(pool);
pool.getConnection = async () => {
  const conn = await origGet();
  wrapExec(conn, "conn");
  return conn;
};

module.exports = pool;
