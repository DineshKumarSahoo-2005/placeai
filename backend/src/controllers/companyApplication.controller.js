const companyApplicationService = require("../services/companyApplication.service");

// Get all company applications
const getCompanyApplications = async (req, res, next) => {
  try {
    const applications = await companyApplicationService.getCompanyApplications(
      req.user.id,
    );

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// Get applications for a particular drive
const getDriveApplications = async (req, res, next) => {
  try {
    const applications = await companyApplicationService.getDriveApplications(
      req.user.id,
      req.params.driveId,
    );

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// Get individual application
const getCompanyApplicationById = async (req, res, next) => {
  try {
    const application =
      await companyApplicationService.getCompanyApplicationById(
        req.user.id,
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

// Update application status
const updateApplicationStatus = async (req, res, next) => {
  try {
    const application = await companyApplicationService.updateApplicationStatus(
      req.user.id,
      req.params.id,
      req.body.status,
    );

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyApplications,
  getDriveApplications,
  getCompanyApplicationById,
  updateApplicationStatus,
};
