const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

const adminAnalyticsController = require("../controllers/adminAnalytics.controller");

// Authentication
router.use(authenticate);

// Admin-only access
router.use(authorizeRoles("admin"));

router.get("/overview", adminAnalyticsController.getOverview);

router.get(
  "/applications-by-status",
  adminAnalyticsController.getApplicationsByStatus,
);

router.get("/top-companies", adminAnalyticsController.getTopCompanies);

router.get("/branch-statistics", adminAnalyticsController.getBranchStatistics);

module.exports = router;
