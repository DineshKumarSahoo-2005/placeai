const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const adminApplicationController = require("../controllers/adminApplication.controller");

const {
  applicationIdValidator,
  applicationFiltersValidator,
} = require("../validators/adminApplication.validator");

// All routes require authentication
router.use(authenticate);

// Only admins can access these routes
router.use(authorizeRoles("admin"));

// Application statistics
router.get("/stats", adminApplicationController.getApplicationStats);

// All applications with filters
router.get(
  "/",
  applicationFiltersValidator,
  validateRequest,
  adminApplicationController.getAllApplications,
);

// Individual application
router.get(
  "/:id",
  applicationIdValidator,
  validateRequest,
  adminApplicationController.getApplicationById,
);

module.exports = router;
