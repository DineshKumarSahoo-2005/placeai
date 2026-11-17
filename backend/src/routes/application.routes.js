const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const applicationController = require("../controllers/application.controller");

const {
  applyForJobDriveValidator,
  applicationIdValidator,
} = require("../validators/application.validator");

// All application routes require a logged-in student
router.use(authenticate);
router.use(authorizeRoles("student"));

// Apply for a job drive
router.post(
  "/:driveId",
  applyForJobDriveValidator,
  validateRequest,
  applicationController.applyForJobDrive,
);

// Get all applications of logged-in student
// Keep this before /:id
router.get("/my-applications", applicationController.getMyApplications);

// Get a particular application
router.get(
  "/:id",
  applicationIdValidator,
  validateRequest,
  applicationController.getApplicationById,
);

// Withdraw an application
router.patch(
  "/:id/withdraw",
  applicationIdValidator,
  validateRequest,
  applicationController.withdrawApplication,
);

module.exports = router;
