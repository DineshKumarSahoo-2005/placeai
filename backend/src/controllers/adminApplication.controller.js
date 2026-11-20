const adminApplicationService = require("../services/adminApplication.service");

// Get all applications
const getAllApplications = async (req, res, next) => {
  try {
    const result = await adminApplicationService.getAllApplications(req.query);

    res.status(200).json({
      success: true,
      data: result.applications,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// Get individual application
const getApplicationById = async (req, res, next) => {
  try {
    const application = await adminApplicationService.getApplicationById(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Get application statistics
const getApplicationStats = async (req, res, next) => {
  try {
    const stats = await adminApplicationService.getApplicationStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  getApplicationStats,
};
