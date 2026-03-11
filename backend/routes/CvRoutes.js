// backend/routes/CvRoutes.js
"use strict";

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const cv = require("../controllers/CvController");
const verifyToken = require("../middleware/verifyToken");

// Health check can stay public
router.get("/__health", (_req, res) => res.json({ ok: true }));

// ---- CV meta ----
router.post("/create", verifyToken, cv.createCv);

// ---- Personal Details ----
router.post("/personal", verifyToken, cv.createPersonalDetails);
router.get("/personal/:cvId", verifyToken, cv.getPersonalDetails);
router.put("/personal/:cvId", verifyToken, cv.updatePersonalDetails);

// ---- Photo ----
router.post(
  "/personal/:cvId/photo",
  verifyToken,
  upload.single("photo"),
  cv.uploadPersonalPhoto
);

// ---- Experience ----
router.post("/experience", verifyToken, cv.addExperience);
router.get("/experience/:cvId", verifyToken, cv.getExperiences);
router.put("/experience/:id", verifyToken, cv.updateExperience);
router.delete("/experience/:id", verifyToken, cv.deleteExperience);

// ---- Education ----
router.post("/education", verifyToken, cv.addEducation);
router.get("/education/:cvId", verifyToken, cv.getEducations);
router.put("/education/:id", verifyToken, cv.updateEducation);
router.delete("/education/:id", verifyToken, cv.deleteEducation);

// ---- Skills ----
router.post("/skills", verifyToken, cv.addSkill);
router.get("/skills/:cvId", verifyToken, cv.getSkills);
router.put("/skills/:id", verifyToken, cv.updateSkill);
router.delete("/skills/:id", verifyToken, cv.deleteSkill);

// ---- Interests ----
router.post("/interests", verifyToken, cv.addInterest);
router.get("/interests/:cvId", verifyToken, cv.getInterests);
router.put("/interests/:id", verifyToken, cv.updateInterest);
router.delete("/interests/:id", verifyToken, cv.deleteInterest);

// ---- Full CV ----
router.get("/full/:cvId", verifyToken, cv.getFullCV);

// ---- Template ----
router.put("/:cvId/template", verifyToken, cv.setCvTemplate);

// ---- Draft lifecycle ----
router.post("/draft", verifyToken, cv.getOrCreateDraftCv);
router.get("/draft/full", verifyToken, cv.getMyDraftFull);
router.post("/:cvId/finalize", verifyToken, cv.finalizeCv);
router.get("/history", verifyToken, cv.getMyCvHistory);

module.exports = router;
