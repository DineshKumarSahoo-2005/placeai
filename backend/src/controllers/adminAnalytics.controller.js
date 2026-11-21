const adminAnalyticsService = require("../services/adminAnalytics.service");

// Overall overview
const getOverview = async (req, res, next) => {
  try {
    const data = await adminAnalyticsService.getOverview();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Applications by status
const getApplicationsByStatus = async (req, res, next) => {
  try {
    const data = await adminAnalyticsService.getApplicationsByStatus();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Top companies
const getTopCompanies = async (req, res, next) => {
  try {
    const data = await adminAnalyticsService.getTopCompanies();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Branch statistics
const getBranchStatistics = async (req, res, next) => {
  try {
    const data = await adminAnalyticsService.getBranchStatistics();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getApplicationsByStatus,
  getTopCompanies,
  getBranchStatistics,
};
