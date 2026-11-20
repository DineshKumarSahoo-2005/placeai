const { param, query } = require("express-validator");

const applicationIdValidator = [
  param("id").isMongoId().withMessage("Invalid application ID"),
];

const applicationFiltersValidator = [
  query("status")
    .optional()
    .isIn([
      "applied",
      "under-review",
      "shortlisted",
      "selected",
      "rejected",
      "withdrawn",
    ])
    .withMessage("Invalid application status"),

  query("jobDrive").optional().isMongoId().withMessage("Invalid job drive ID"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

module.exports = {
  applicationIdValidator,
  applicationFiltersValidator,
};
