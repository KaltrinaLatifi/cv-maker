/**types/resume.js
 * @typedef {Object} WorkItem
 * @property {string} company
 * @property {string} position
 * @property {string} startDate        // "YYYY-MM"
 * @property {string=} endDate         // "YYYY-MM" (optional)
 * @property {string=} summary
 * @property {string[]=} highlights
 */

/**
 * @typedef {Object} EducationItem
 * @property {string} institution
 * @property {string=} area
 * @property {string=} studyType
 * @property {string=} startDate       // "YYYY-MM"
 * @property {string=} endDate         // "YYYY-MM"
 */

/**
 * @typedef {Object} SkillItem
 * @property {string} name
 * @property {string[]=} keywords
 */

/**
 * @typedef {Object} ResumeJson
 * @property {{ name: string; email?: string; phone?: string; website?: string; label?: string; location?: { city?: string; countryCode?: string } }} basics
 * @property {WorkItem[]} work
 * @property {EducationItem[]} education
 * @property {SkillItem[]} skills
 */

/** @type {ResumeJson} */
export const emptyResume = {
  basics: {
    name: "",
    email: "",
    phone: "",
    website: "",
    label: "",
    location: { city: "", countryCode: "" }
  },
  work: [],
  education: [],
  skills: []
};

/**
 * Helpers to make empty items (optional)
 */

/** @returns {WorkItem} */
export function newWorkItem() {
  return {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    summary: "",
    highlights: []
  };
}

/** @returns {EducationItem} */
export function newEducationItem() {
  return {
    institution: "",
    area: "",
    studyType: "",
    startDate: "",
    endDate: ""
  };
}

/** @returns {SkillItem} */
export function newSkillItem() {
  return {
    name: "",
    keywords: []
  };
}
