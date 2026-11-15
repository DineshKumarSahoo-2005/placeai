const JobDrive = require("../models/JobDrive");
const Company = require("../models/Company");
const AppError = require("../utils/AppError");

// Only allow fields that a company is permitted to provide.
const pickJobDriveData = (data) => {
  const allowedFields = [
    "jobTitle",
    "jobDescription",
    "jobType",
    "location",
    "salary",
    "applicationDeadline",
  ];

  const jobData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      jobData[field] = data[field];
    }
  });

  if (data.eligibility) {
    const allowedEligibilityFields = [
      "minimumCGPA",
      "maximumBacklogs",
      "eligibleBranches",
      "graduationYear",
      "requiredSkills",
    ];

    jobData.eligibility = {};

    allowedEligibilityFields.forEach((field) => {
      if (data.eligibility[field] !== undefined) {
        jobData.eligibility[field] = data.eligibility[field];
      }
    });
  }

  return jobData;
};

// 1. Create a job drive
const createJobDrive = async (userId, data) => {
  const company = await Company.findOne({ user: userId });

  if (!company) {
    throw new AppError("Please create your company profile first", 404);
  }

  const jobData = pickJobDriveData(data);

  const jobDrive = await JobDrive.create({
    ...jobData,
    company: company._id,
    createdBy: userId,
    status: "draft",
  });

  return jobDrive;
};

// 2. Get all drives created by the logged-in company
const getMyJobDrives = async (userId) => {
  const jobDrives = await JobDrive.find({
    createdBy: userId,
  })
    .populate("company", "companyName industry")
    .sort({ createdAt: -1 });

  return jobDrives;
};

// 3. Get a single job drive
const getJobDriveById = async (driveId, userId) => {
  const jobDrive = await JobDrive.findOne({
    _id: driveId,
    createdBy: userId,
  }).populate("company", "companyName industry");

  if (!jobDrive) {
    throw new AppError("Job drive not found", 404);
  }

  return jobDrive;
};

// 4. Update a job drive
const updateJobDrive = async (driveId, userId, data) => {
  const jobDrive = await JobDrive.findOne({
    _id: driveId,
    createdBy: userId,
  });

  if (!jobDrive) {
    throw new AppError("Job drive not found", 404);
  }

  const updatedData = pickJobDriveData(data);

  // Update ordinary job fields
  Object.keys(updatedData).forEach((field) => {
    if (field !== "eligibility") {
      jobDrive[field] = updatedData[field];
    }
  });

  // Merge eligibility fields instead of replacing the entire object
  if (updatedData.eligibility) {
    Object.assign(jobDrive.eligibility, updatedData.eligibility);
  }

  await jobDrive.save();

  return jobDrive;
};

module.exports = {
  createJobDrive,
  getMyJobDrives,
  getJobDriveById,
  updateJobDrive,
};
