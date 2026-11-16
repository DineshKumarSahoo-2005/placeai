const JobDrive = require("../models/JobDrive");
const AppError = require("../utils/AppError");

// Get all active published job drives
const getPublishedJobDrives = async () => {
  const jobDrives = await JobDrive.find({
    status: "published",
    applicationDeadline: { $gte: new Date() },
  })
    .populate("company", "companyName industry website")
    .sort({ createdAt: -1 });

  return jobDrives;
};

// Get details of one published job drive
const getPublishedJobDriveById = async (driveId) => {
  const jobDrive = await JobDrive.findOne({
    _id: driveId,
    status: "published",
    applicationDeadline: { $gte: new Date() },
  }).populate("company", "companyName industry website description");

  if (!jobDrive) {
    throw new AppError(
      "Published job drive not found or application deadline has passed",
      404,
    );
  }

  return jobDrive;
};

module.exports = {
  getPublishedJobDrives,
  getPublishedJobDriveById,
};
