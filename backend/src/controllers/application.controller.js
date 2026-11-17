const applicationService = require("../services/application.service");

// Apply for a job drive
const applyForJobDrive = async (req, res, next) => {
  try {
    const application = await applicationService.applyForJobDrive(
      req.user.id,
      req.params.driveId,
      req.body.coverLetter,
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Get all my applications
const getMyApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getMyApplications(
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      results: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// Get one application
const getApplicationById = async (req, res, next) => {
  try {
    const application = await applicationService.getApplicationById(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Withdraw application
const withdrawApplication = async (req, res, next) => {
  try {
    const application = await applicationService.withdrawApplication(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyForJobDrive,
  getMyApplications,
  getApplicationById,
  withdrawApplication,
};
