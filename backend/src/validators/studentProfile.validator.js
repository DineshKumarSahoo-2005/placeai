const { body } = require("express-validator");

const createProfileValidator = [
  body("phone")
    .optional()
    .isString()
    .trim(),

  body("rollNumber")
    .optional()
    .isString()
    .trim(),

  body("branch")
    .optional()
    .isString()
    .trim(),

  body("department")
    .optional()
    .isString()
    .trim(),

  body("currentSemester")
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage("Semester must be between 1 and 12"),

  body("cgpa")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("CGPA must be between 0 and 10"),

  body("activeBacklogs")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Active backlogs cannot be negative"),

  body("graduationYear")
    .optional()
    .isInt({ min: 2020, max: 2100 })
    .withMessage("Enter a valid graduation year"),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array"),

  body("skills.*")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each skill must be a non-empty string"),

  body("projects")
    .optional()
    .isArray()
    .withMessage("Projects must be an array"),

  body("projects.*.title")
    .if(body("projects.*").exists())
    .notEmpty()
    .withMessage("Project title is required"),

  body("certifications")
    .optional()
    .isArray()
    .withMessage("Certifications must be an array"),

  body("certifications.*.name")
    .if(body("certifications.*").exists())
    .notEmpty()
    .withMessage("Certification name is required")
];

const updateProfileValidator = createProfileValidator;

module.exports = {
  createProfileValidator,
  updateProfileValidator
};
