// backend/controllers/CvController.js
"use strict";

const db = require("../Database/db");
const Experience = require("../models/ExperienceModel");
const Education = require("../models/EducationModel");
const Skill = require("../models/SkillModel");
const Interest = require("../models/InterestModel");

const DEBUG = String(process.env.DEBUG_SQL || "").toLowerCase() === "true";
const toNull = (v) => (v === undefined ? null : v);

function assertNoUndefined(params, where) {
  if (Array.isArray(params) && params.some((v) => v === undefined)) {
    const idx = params.findIndex((v) => v === undefined);
    throw new Error(`[BindError] undefined param at index ${idx} in ${where}`);
  }
}

/* ---------------- helpers ---------------- */
async function assertCvOwnedByUser(cvId, userId) {
  const [[row]] = await db.execute(
    "SELECT id, userId, templateId, title FROM cvs WHERE id=? AND userId=? LIMIT 1",
    [cvId, userId]
  );
  if (!row) {
    const e = new Error("CV not found");
    e.status = 404;
    throw e;
  }
  return row;
}

const TABLES = Object.freeze({
  experience: "experiences",
  education: "education",
  skills: "skills",
  interests: "interests",
});

async function assertRowOwnedByUser(tableKey, rowId, userId) {
  const table = TABLES[tableKey];
  if (!table) {
    const e = new Error(`Invalid tableKey: ${tableKey}`);
    e.status = 500;
    throw e;
  }

  const id = Number(rowId);
  if (!Number.isFinite(id)) {
    const e = new Error("Invalid id");
    e.status = 400;
    throw e;
  }

  const [[row]] = await db.execute(
    `
    SELECT t.id, t.cvId
    FROM ${table} t
    JOIN cvs c ON c.id = t.cvId
    WHERE t.id = ? AND c.userId = ?
    LIMIT 1
    `,
    [id, userId]
  );

  if (!row) {
    const e = new Error("Not found");
    e.status = 404;
    throw e;
  }

  return row;
} 
/* ---------------- CV meta ---------------- */
// POST /api/cv/create
exports.createCv = async (req, res, next) => {
  try {
    // 1. must be authenticated
    const authenticatedUserId = req.user?.id;
    if (!authenticatedUserId) {
      const e = new Error("Not authenticated");
      e.status = 401;
      throw e;
    }

    // 2. find any active template (first active one)
    const [templates] = await db.query(
      "SELECT id FROM templates WHERE is_active = 1 ORDER BY id ASC LIMIT 1"
    );
    const pickedTemplateId = templates.length ? templates[0].id : null;

    // 3. get user's name to build a nice title
    const [[userRow]] = await db.query(
      "SELECT fullName FROM users WHERE id = ? LIMIT 1",
      [authenticatedUserId]
    );
    const userFullName = userRow?.fullName?.trim() || "";

    // 4. build the final title
    const bodyTitle =
      req.body && req.body.title ? String(req.body.title).trim() : "";
    const finalTitle =
      bodyTitle ||
      (userFullName
        ? `CV of ${userFullName}`
        : `My CV ${new Date().toISOString().slice(0, 10)}`);

    const params = [authenticatedUserId, pickedTemplateId, finalTitle];

    const [r] = await db.execute(
      "INSERT INTO cvs (userId, templateId, title) VALUES (?, ?, ?)",
      params
    );

    if (DEBUG) {
      console.log(
        "[CREATE CV] user=",
        authenticatedUserId,
        "title=",
        finalTitle
      );
    }

    res.status(201).json({
      cvId: r.insertId,
      userId: authenticatedUserId,
      templateId: pickedTemplateId,
      title: finalTitle,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- Page 1: Personal ---------------- */

/** Build values array in the exact order used in SQL columns below. */
function buildPersonalValues(body, cvIdFromRoute) {
  const cvId = Number(body.cvId ?? body.cvid ?? cvIdFromRoute);
  if (!Number.isFinite(cvId)) {
    const e = new Error("cvId/cvid is required");
    e.status = 400;
    throw e;
  }

  const firstName = body.first_name ?? body.firstName ?? "";
  const lastName = body.last_name ?? body.lastName ?? "";
  const email = body.email ?? "";
  const phone = body.phone_number ?? body.phoneNumber ?? null;
  const address = body.address ?? null;
  const zip = body.zip_code ?? body.zipCode ?? null;
  const city = body.city ?? null;
  const objective = body.objective ?? body.resumeObjective ?? null;
  const photoUrl = body.photo_url ?? body.photoUrl ?? null;

  const values = [
    cvId,
    String(firstName),
    String(lastName),
    String(email),
    toNull(phone),
    toNull(address),
    toNull(zip),
    toNull(city),
    toNull(objective),
    toNull(photoUrl),
  ];

  assertNoUndefined(values, "personaldetails upsert");
  return { cvId, values };
}

// POST /api/cv/personal  -> UPSERT by cvId
exports.createPersonalDetails = async (req, res, next) => {
  try {
    const { cvId, values } = buildPersonalValues(req.body);
    const userId = requireAuth(req);
    await assertCvOwnedByUser(cvId, userId);

    const sql = `
  INSERT INTO personaldetails
  (cvId, first_name, last_name, email, phone_number, address, zip_code, city, objective, photo_url)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  first_name   = VALUES(first_name),
  last_name    = VALUES(last_name),
  email        = VALUES(email),
  phone_number = VALUES(phone_number),
  address      = VALUES(address),
  zip_code     = VALUES(zip_code),
  city         = VALUES(city),
  objective    = VALUES(objective),
  photo_url    = VALUES(photo_url)
`;

    if (DEBUG) console.log("[SQL personal upsert POST]", sql, values);
    await db.execute(sql, values);

    console.log("[PERSONAL UPSERT POST] values:", values);
    console.log("[PERSONAL UPSERT POST] SQL:\n", sql);

    const [[row]] = await db.execute(
      "SELECT * FROM personaldetails WHERE cvId = ? LIMIT 1",
      [cvId]
    );
    res.status(201).json(row || null);
  } catch (err) {
    console.error("[createPersonalDetails error]", err);
    next(err);
  }
};

// GET /api/cv/personal/:cvId
exports.getPersonalDetails = async (req, res, next) => {
  try {
    const cvId = Number(req.params.cvId);
    const userId = requireAuth(req);
    await assertCvOwnedByUser(cvId, userId);

    const [[row]] = await db.execute(
      "SELECT * FROM personaldetails WHERE cvId = ? LIMIT 1",
      [cvId]
    );
    res.json(row || null);
  } catch (err) {
    next(err);
  }
};

// PUT /api/cv/personal/:cvId  -> UPSERT by cvId
exports.updatePersonalDetails = async (req, res, next) => {
  try {
    const cvId = Number(req.params.cvId);
    const userId = requireAuth(req);
    await assertCvOwnedByUser(cvId, userId);

    // buildPersonalValues already includes objective as the last value
    const { values } = buildPersonalValues({ ...req.body, cvId }, cvId);

    const sql = `
  INSERT INTO personaldetails
    (cvId, first_name, last_name, email, phone_number, address, zip_code, city, objective, photo_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    first_name   = VALUES(first_name),
    last_name    = VALUES(last_name),
    email        = VALUES(email),
    phone_number = VALUES(phone_number),
    address      = VALUES(address),
    zip_code     = VALUES(zip_code),
    city         = VALUES(city),
    objective    = VALUES(objective),
    photo_url    = VALUES(photo_url)
`;

    if (DEBUG) console.log("[SQL personal upsert PUT]", sql, values);
    await db.execute(sql, values);

    console.log("[PERSONAL UPSERT PUT] values:", values);
    console.log("[PERSONAL UPSERT PUT] SQL:\n", sql);

    const [[row]] = await db.execute(
      "SELECT * FROM personaldetails WHERE cvId = ? LIMIT 1",
      [cvId]
    );
    res.json(row || null);
  } catch (err) {
    console.error("[updatePersonalDetails error]", err);
    next(err);
  }
};
// POST /api/cv/personal/:cvId/photo
exports.uploadPersonalPhoto = async (req, res, next) => {
  try {
    const cvId = Number(req.params.cvId);
    const userId = requireAuth(req);
    await assertCvOwnedByUser(cvId, userId);

    if (!req.file) {
      const e = new Error("No file uploaded");
      e.status = 400;
      throw e;
    }

    // Your express static is mounted at /uploads -> backend/uploads/...
    // req.file.path is absolute; we want a public URL path:
    // e.g. /uploads/profile/cv_140_123.jpg
    const publicPath = `/uploads/profile/${req.file.filename}`;

    await db.execute(
      `INSERT INTO personaldetails (cvId, first_name, last_name, email, photo_url)
   VALUES (?, '', '', '', ?)
   ON DUPLICATE KEY UPDATE photo_url = VALUES(photo_url)`,
      [cvId, publicPath]
    );

    const [[row]] = await db.execute(
      "SELECT * FROM personaldetails WHERE cvId = ? LIMIT 1",
      [cvId]
    );

    res.json({ ok: true, photo_url: publicPath, personal: row || null });
  } catch (err) {
    next(err);
  }
};

// POST /api/cv/draft
exports.getOrCreateDraftCv = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [[draft]] = await db.execute(
      `SELECT id FROM cvs
       WHERE userId = ? AND status = 'draft'
       LIMIT 1`,
      [userId]
    );

    if (draft) {
      return res.json({ cvId: draft.id });
    }

    const [templates] = await db.query(
      "SELECT id FROM templates WHERE is_active = 1 ORDER BY id ASC LIMIT 1"
    );

    const [[userRow]] = await db.query(
      "SELECT fullName FROM users WHERE id=? LIMIT 1",
      [userId]
    );

    const title = userRow?.fullName ? `CV of ${userRow.fullName}` : "My CV";

    const [r] = await db.execute(
      `INSERT INTO cvs (userId, templateId, title, status)
       VALUES (?, ?, ?, 'draft')`,
      [userId, templates[0]?.id || null, title]
    );

    res.json({ cvId: r.insertId });
  } catch (e) {
    next(e);
  }
};

// GET /api/cv/draft/full
// GET /api/cv/draft/full
exports.getMyDraftFull = async (req, res, next) => {
  try {
    const userId = requireAuth(req);

    // find latest draft
    const [[draft]] = await db.execute(
      `SELECT id FROM cvs
       WHERE userId=? AND status='draft'
       ORDER BY COALESCE(updated_at, createdAt) DESC
       LIMIT 1`,
      [userId]
    );

    let cvId = draft?.id;

    // if no draft → create one
    if (!cvId) {
      const [templates] = await db.query(
        "SELECT id FROM templates WHERE is_active = 1 ORDER BY id ASC LIMIT 1"
      );
      const templateId = templates.length ? templates[0].id : null;

      const [[userRow]] = await db.query(
        "SELECT fullName FROM users WHERE id = ? LIMIT 1",
        [userId]
      );

      const title = userRow?.fullName ? `CV of ${userRow.fullName}` : "My CV";

      const [r] = await db.execute(
        `INSERT INTO cvs (userId, templateId, title, status)
         VALUES (?, ?, ?, 'draft')`,
        [userId, templateId, title]
      );

      cvId = r.insertId;
    }

    // return full CV bundle
    req.params.cvId = String(cvId);
    return exports.getFullCV(req, res, next);
  } catch (err) {
    next(err);
  }
};

// POST /api/cv/:cvId/finalize
exports.finalizeCv = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cvId = Number(req.params.cvId);

    const [r] = await db.execute(
      `
      UPDATE cvs
      SET status='final',
          completed_at=CURRENT_TIMESTAMP
      WHERE id=? AND userId=? AND status='draft'
      `,
      [cvId, userId]
    );

    res.json({ ok: true, affected: r.affectedRows });
  } catch (err) {
    next(err);
  }
};

// GET /api/cv/history
exports.getMyCvHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const [rows] = await db.execute(
      `SELECT id, title, status, createdAt, updated_at, completed_at
       FROM cvs
       WHERE userId = ?
       ORDER BY
         CASE WHEN status='draft' THEN 0 ELSE 1 END,
         COALESCE(updated_at, createdAt) DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

function requireAuth(req) {
  const userId = req.user?.id;
  if (!userId) {
    const e = new Error("Not authenticated");
    e.status = 401;
    throw e;
  }
  return userId;
}

/* -------- Page 2: Experience / Education / Skills / Interests -------- */
exports.addExperience = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.body.cvId ?? req.body.cvid);
    await assertCvOwnedByUser(cvId, userId);
    const id = await Experience.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};
exports.getExperiences = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.params.cvId);
    await assertCvOwnedByUser(cvId, userId);
    res.json(await Experience.findByCv(cvId));
  } catch (e) {
    next(e);
  }
};
exports.updateExperience = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("experience", req.params.id, userId);

    const row = await Experience.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    next(e);
  }
};
exports.deleteExperience = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("experience", req.params.id, userId);

    const ok = await Experience.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ deleted: ok });
  } catch (e) {
    next(e);
  }
};

exports.addEducation = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.body.cvId ?? req.body.cvid);
    await assertCvOwnedByUser(cvId, userId);
    const id = await Education.create(req.body);
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
};
exports.getEducations = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.params.cvId);
    await assertCvOwnedByUser(cvId, userId);
    res.json(await Education.findByCv(cvId));
  } catch (e) {
    next(e);
  }
};
exports.updateEducation = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("education", req.params.id, userId);

    const row = await Education.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    next(e);
  }
};
exports.deleteEducation = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("education", req.params.id, userId);

    const ok = await Education.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ deleted: ok });
  } catch (e) {
    next(e);
  }
};

exports.addSkill = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.body.cvId ?? req.body.cvid);
    await assertCvOwnedByUser(cvId, userId);
    const id = await Skill.create(req.body);
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
};
exports.getSkills = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.params.cvId);
    await assertCvOwnedByUser(cvId, userId);
    res.json(await Skill.findByCv(cvId));
  } catch (e) {
    next(e);
  }
};
exports.updateSkill = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("skills", req.params.id, userId);

    const row = await Skill.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    next(e);
  }
};
exports.deleteSkill = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("skills", req.params.id, userId);

    const ok = await Skill.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ deleted: ok });
  } catch (e) {
    next(e);
  }
};

exports.addInterest = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.body.cvId ?? req.body.cvid);
    await assertCvOwnedByUser(cvId, userId);
    const id = await Interest.create(req.body);
    res.status(201).json({ id });
  } catch (e) {
    next(e);
  }
};
exports.getInterests = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    const cvId = Number(req.params.cvId);
    await assertCvOwnedByUser(cvId, userId);
    res.json(await Interest.findByCv(cvId));
  } catch (e) {
    next(e);
  }
};
exports.updateInterest = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("interests", req.params.id, userId);

    const row = await Interest.update(req.params.id, req.body);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  } catch (e) {
    next(e);
  }
};

exports.deleteInterest = async (req, res, next) => {
  try {
    const userId = requireAuth(req);
    await assertRowOwnedByUser("interests", req.params.id, userId);

    const ok = await Interest.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ deleted: ok });
  } catch (e) {
    next(e);
  }
};

/* -------------- Page 3 bundle -------------- */
exports.getFullCV = async (req, res, next) => {
  try {
    const cvId = Number(req.params.cvId);
    const userId = requireAuth(req);

    const cvRow = await assertCvOwnedByUser(cvId, userId);

    const [[personal]] = await db.execute(
      "SELECT * FROM personaldetails WHERE cvId = ? LIMIT 1",
      [cvId]
    );

    const experiences = await Experience.findByCv(cvId);
    const education = await Education.findByCv(cvId);
    const skills = await Skill.findByCv(cvId);
    const interests = await Interest.findByCv(cvId);

    res.json({
      cvMeta: {
        id: cvRow.id,
        title: cvRow.title,
        templateId: cvRow.templateId,
      },
      personal: personal || null,
      experiences,
      education,
      skills,
      interests,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/cv/:cvId/template
exports.setCvTemplate = async (req, res, next) => {
  try {
    const cvId = Number(req.params.cvId);
    const { templateId } = req.body;

    if (!templateId) {
      return res.status(400).json({ error: "templateId is required" });
    }

    const userId = requireAuth(req);
    await assertCvOwnedByUser(cvId, userId);

    const [result] = await db.execute(
      "UPDATE cvs SET templateId = ? WHERE id = ? AND userId = ?",
      [templateId, cvId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "CV not found" });
    }

    res.json({ ok: true, cvId, templateId });
  } catch (err) {
    console.error("[setCvTemplate error]", err);
    next(err);
  }
};
