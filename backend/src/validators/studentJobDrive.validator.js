const { param } = require("express-validator");

const jobDriveIdValidator = [
  param("id").isMongoId().withMessage("Invalid job drive ID"),
];

module.exports = {
  jobDriveIdValidator,
};
