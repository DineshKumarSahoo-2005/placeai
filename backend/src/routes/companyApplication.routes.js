const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const companyApplicationController = require("../controllers/companyApplication.controller");

const {
  driveIdValidator,
  applicationIdValidator,
  updateApplicationStatusValidator,
} = require("../validators/companyApplication.validator");

// All routes require company authentication
router.use(authenticate);
router.use(authorizeRoles("company"));

// Get all applications received by the company
router.get("/", companyApplicationController.getCompanyApplications);

// Get applications for a particular job drive
router.get(
  "/drive/:driveId",
  driveIdValidator,
  validateRequest,
  companyApplicationController.getDriveApplications,
);

// Update application status
router.patch(
  "/:id/status",
  updateApplicationStatusValidator,
  validateRequest,
  companyApplicationController.updateApplicationStatus,
);

// Get individual application
router.get(
  "/:id",
  applicationIdValidator,
  validateRequest,
  companyApplicationController.getCompanyApplicationById,
);

module.exports = router;
