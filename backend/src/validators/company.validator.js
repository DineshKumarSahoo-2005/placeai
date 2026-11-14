const { body } = require("express-validator");

const companyProfileValidator = [
  body("companyName")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Company name must be between 2 and 150 characters"),

  body("industry")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Industry cannot be empty"),

  body("website")
    .optional({ checkFalsy: true })
    .isURL({
      require_protocol: true,
    })
    .withMessage("Enter a valid website URL including https://"),

  body("description")
    .optional()
    .isString()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  body("headquarters").optional().isString().trim(),

  body("contactPerson").optional().isString().trim(),

  body("contactEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Enter a valid contact email"),

  body("contactPhone")
    .optional({ checkFalsy: true })
    .matches(/^\+?[0-9\s-]{7,20}$/)
    .withMessage("Enter a valid contact phone number"),

  body("companySize")
    .optional()
    .isIn(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .withMessage("Invalid company size"),
];

const createCompanyValidator = [
  body("companyName")
    .isString()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Company name must be between 2 and 150 characters"),

  body("industry")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Industry is required"),

  ...companyProfileValidator,
];

const updateCompanyValidator = companyProfileValidator;

module.exports = {
  createCompanyValidator,
  updateCompanyValidator,
};
