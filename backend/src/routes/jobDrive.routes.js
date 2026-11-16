const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const jobDriveController = require("../controllers/jobDrive.controller");
const studentJobDriveController = require("../controllers/studentJobDrive.controller");
const eligibilityController = require("../controllers/eligibility.controller");

const {
  createJobDriveValidator,
  updateJobDriveValidator,
  jobDriveIdValidator,
} = require("../validators/jobDrive.validator");

const {
  jobDriveIdValidator: studentDriveIdValidator,
} = require("../validators/studentJobDrive.validator");


// COMPANY ROUTES
router.post(
  "/",
  authenticate,
  authorizeRoles("company"),
  createJobDriveValidator,
  validateRequest,
  jobDriveController.createJobDrive,
);

router.get(
  "/my-drives",
  authenticate,
  authorizeRoles("company"),
  jobDriveController.getMyJobDrives,
);

router.get(
  "/company/:id",
  authenticate,
  authorizeRoles("company"),
  jobDriveIdValidator,
  validateRequest,
  jobDriveController.getJobDriveById,
);

router.patch(
  "/:id/publish",
  authenticate,
  authorizeRoles("company"),
  jobDriveIdValidator,
  validateRequest,
  jobDriveController.publishJobDrive
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles("company"),
  updateJobDriveValidator,
  validateRequest,
  jobDriveController.updateJobDrive,
);

// STUDENT ROUTES
// Get all published drives
router.get(
  "/",
  authenticate,
  authorizeRoles("student"),
  studentJobDriveController.getPublishedJobDrives,
);

// Get published drive details
router.get(
  "/:id",
  authenticate,
  authorizeRoles("student"),
  studentDriveIdValidator,
  validateRequest,
  studentJobDriveController.getPublishedJobDriveById,
);

// Check student eligibility
router.get(
  "/:id/eligibility",
  authenticate,
  authorizeRoles("student"),
  studentDriveIdValidator,
  validateRequest,
  eligibilityController.checkEligibility,
);

module.exports = router;
