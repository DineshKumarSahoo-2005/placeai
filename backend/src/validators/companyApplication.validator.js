const { body, param } = require("express-validator");

const driveIdValidator = [
  param("driveId").isMongoId().withMessage("Invalid job drive ID"),
];

const applicationIdValidator = [
  param("id").isMongoId().withMessage("Invalid application ID"),
];

const updateApplicationStatusValidator = [
  param("id").isMongoId().withMessage("Invalid application ID"),

  body("status")
    .isIn(["under-review", "shortlisted", "selected", "rejected"])
    .withMessage("Invalid application status"),
];

module.exports = {
  driveIdValidator,
  applicationIdValidator,
  updateApplicationStatusValidator,
};
