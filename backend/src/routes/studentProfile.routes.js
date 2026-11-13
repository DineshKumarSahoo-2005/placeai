const express = require("express");
const router = express.Router();
const studentProfileController = require("../controllers/studentProfile.controller");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");
const validateRequest = require("../middleware/validateRequest");

const {
  createProfileValidator,
  updateProfileValidator
} = require("../validators/studentProfile.validator");

// All routes require authentication and student role
router.use(authenticate);
router.use(authorizeRoles("student"));

// Create student profile
router.post(
  "/profile",
  createProfileValidator,
  validateRequest,
  studentProfileController.createProfile
);

// Get logged-in student's profile
router.get(
  "/profile",
  studentProfileController.getProfile
);

// Update logged-in student's profile
router.patch(
  "/profile",
  updateProfileValidator,
  validateRequest,
  studentProfileController.updateProfile
);

module.exports = router;
