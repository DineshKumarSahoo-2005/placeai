const express = require("express");
const router = express.Router();

const companyController = require("../controllers/company.controller");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const {
  createCompanyValidator,
  updateCompanyValidator,
} = require("../validators/company.validator");

// All company routes require authentication
router.use(authenticate);

// Only company users can access these routes
router.use(authorizeRoles("company"));

// Create company profile
router.post(
  "/profile",
  createCompanyValidator,
  validateRequest,
  companyController.createCompanyProfile,
);

// Get company profile
router.get("/profile", companyController.getCompanyProfile);

// Update company profile
router.patch(
  "/profile",
  updateCompanyValidator,
  validateRequest,
  companyController.updateCompanyProfile,
);

module.exports = router;
