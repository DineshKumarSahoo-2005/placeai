const { body, param } = require("express-validator");

const applyForJobDriveValidator = [
  param("driveId").isMongoId().withMessage("Invalid job drive ID"),

  body("coverLetter")
    .optional()
    .isString()
    .withMessage("Cover letter must be text")
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Cover letter cannot exceed 2000 characters"),
];

const applicationIdValidator = [
  param("id").isMongoId().withMessage("Invalid application ID"),
];

module.exports = {
  applyForJobDriveValidator,
  applicationIdValidator,
};
