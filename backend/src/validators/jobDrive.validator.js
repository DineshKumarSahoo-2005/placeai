const { body, param } = require("express-validator");
const { jobDriveIdValidator } = require("./studentJobDrive.validator");

// Common validation for job fields
const jobFields = [
  body("jobTitle")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Job title cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Job title cannot exceed 150 characters"),

  body("jobDescription")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Job description cannot be empty"),

  body("jobType")
    .optional()
    .isIn(["full-time", "internship", "internship-to-full-time"])
    .withMessage("Invalid job type"),

  body("location")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  body("salary")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Salary must be a non-negative number"),

  body("applicationDeadline")
    .optional()
    .isISO8601()
    .withMessage("Enter a valid application deadline"),

  body("eligibility.minimumCGPA")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Minimum CGPA must be between 0 and 10"),

  body("eligibility.maximumBacklogs")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum backlogs must be zero or greater"),

  body("eligibility.eligibleBranches")
    .optional()
    .isArray()
    .withMessage("Eligible branches must be an array"),

  body("eligibility.graduationYear")
    .optional()
    .isInt({ min: 2020, max: 2100 })
    .withMessage("Enter a valid graduation year"),

  body("eligibility.requiredSkills")
    .optional()
    .isArray()
    .withMessage("Required skills must be an array"),
];

// Create validation
const createJobDriveValidator = [
  body("jobTitle")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ max: 150 })
    .withMessage("Job title cannot exceed 150 characters"),

  body("jobDescription")
    .trim()
    .notEmpty()
    .withMessage("Job description is required"),

  body("jobType")
    .optional()
    .isIn(["full-time", "internship", "internship-to-full-time"])
    .withMessage("Invalid job type"),

  body("location").trim().notEmpty().withMessage("Location is required"),

  body("salary").isFloat({ min: 0 }).withMessage("Enter a valid salary"),

  body("applicationDeadline")
    .isISO8601()
    .withMessage("Enter a valid application deadline"),

  body("eligibility")
    .isObject()
    .withMessage("Eligibility details are required"),

  body("eligibility.minimumCGPA")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Minimum CGPA must be between 0 and 10"),

  body("eligibility.graduationYear")
    .isInt({ min: 2020, max: 2100 })
    .withMessage("Enter a valid graduation year"),

  body("eligibility.maximumBacklogs")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum backlogs must be zero or greater"),

  body("eligibility.eligibleBranches")
    .optional()
    .isArray()
    .withMessage("Eligible branches must be an array"),

  body("eligibility.requiredSkills")
    .optional()
    .isArray()
    .withMessage("Required skills must be an array"),
];

// Update validation
const updateJobDriveValidator = [
  param("id").isMongoId().withMessage("Invalid job drive ID"),

  ...jobFields,
];

module.exports = {
  createJobDriveValidator,
  updateJobDriveValidator,
  jobDriveIdValidator,
};
