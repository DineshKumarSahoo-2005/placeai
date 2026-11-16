const studentJobDriveService = require("../services/studentJobDrive.service");

// Get all published drives
const getPublishedJobDrives = async (req, res, next) => {
  try {
    const jobDrives = await studentJobDriveService.getPublishedJobDrives();

    res.status(200).json({
      success: true,
      message: "Published job drives fetched successfully",
      results: jobDrives.length,
      data: jobDrives,
    });
  } catch (error) {
    next(error);
  }
};

// Get one published drive
const getPublishedJobDriveById = async (req, res, next) => {
  try {
    const jobDrive = await studentJobDriveService.getPublishedJobDriveById(
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Job drive details fetched successfully",
      data: jobDrive,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublishedJobDrives,
  getPublishedJobDriveById,
};
