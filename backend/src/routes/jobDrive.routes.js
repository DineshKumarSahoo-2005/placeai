const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const jobDriveController = require("../controllers/jobDrive.controller");

const {
  createJobDriveValidator,
  updateJobDriveValidator,
} = require("../validators/jobDrive.validator");

// Every route requires authentication and company role
router.use(authenticate);
router.use(authorizeRoles("company"));

// Create a job drive
router.post(
  "/",
  createJobDriveValidator,
  validateRequest,
  jobDriveController.createJobDrive,
);

// Get all drives created by the company
router.get("/my-drives", jobDriveController.getMyJobDrives);

// Get one job drive
router.get("/:id", jobDriveController.getJobDriveById);

// Update a job drive
router.patch(
  "/:id",
  updateJobDriveValidator,
  validateRequest,
  jobDriveController.updateJobDrive,
);

module.exports = router;
