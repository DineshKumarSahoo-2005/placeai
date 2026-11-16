const jobDriveService = require("../services/jobDrive.service");

// Create job drive
const createJobDrive = async (req, res, next) => {
  try {
    const jobDrive = await jobDriveService.createJobDrive(
      req.user.id,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Job drive created successfully",
      data: jobDrive,
    });
  } catch (error) {
    next(error);
  }
};

// Get all drives of logged-in company
const getMyJobDrives = async (req, res, next) => {
  try {
    const jobDrives = await jobDriveService.getMyJobDrives(req.user.id);

    res.status(200).json({
      success: true,
      message: "Job drives fetched successfully",
      results: jobDrives.length,
      data: jobDrives,
    });
  } catch (error) {
    next(error);
  }
};

// Get single job drive
const getJobDriveById = async (req, res, next) => {
  try {
    const jobDrive = await jobDriveService.getJobDriveById(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Job drive fetched successfully",
      data: jobDrive,
    });
  } catch (error) {
    next(error);
  }
};

// Update job drive
const updateJobDrive = async (req, res, next) => {
  try {
    const jobDrive = await jobDriveService.updateJobDrive(
      req.params.id,
      req.user.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Job drive updated successfully",
      data: jobDrive,
    });
  } catch (error) {
    next(error);
  }
};

const publishJobDrive = async (req, res, next) => {
  try {
    const jobDrive = await jobDriveService.publishJobDrive(
      req.params.id,
      req.user.id,
    );

    res.status(200).json({
      success: true,
      message: "Job drive published successfully",
      data: jobDrive,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobDrive,
  getMyJobDrives,
  getJobDriveById,
  updateJobDrive,
  publishJobDrive,
};
