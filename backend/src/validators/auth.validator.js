const { body } = require("express-validator");

const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character"
    )
];

module.exports = {
  registerValidation
};
