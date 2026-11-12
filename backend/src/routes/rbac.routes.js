const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

const {
  getStudentDashboard,
  getCompanyDashboard,
  getAdminDashboard,
  getInterviewerDashboard,
} = require("../controllers/rbac.controller");

const router = express.Router();

// Student-only route
router.get(
  "/student",
  authenticate,
  authorizeRoles("student"),
  getStudentDashboard,
);

// Company-only route
router.get(
  "/company",
  authenticate,
  authorizeRoles("company"),
  getCompanyDashboard,
);

// Admin-only route
router.get("/admin", authenticate, authorizeRoles("admin"), getAdminDashboard);

// Interviewer-only route
router.get(
  "/interviewer",
  authenticate,
  authorizeRoles("interviewer"),
  getInterviewerDashboard,
);

module.exports = router;
