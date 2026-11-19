const Application = require("../models/Application");
const JobDrive = require("../models/JobDrive");
const AppError = require("../utils/AppError");

// Reusable population configuration
const applicationPopulation = [
  {
    path: "student",
    select:
      "phone rollNumber branch department currentSemester cgpa activeBacklogs graduationYear skills projects certifications",
    populate: {
      path: "user",
      select: "name email",
    },
  },
  {
    path: "jobDrive",
    select: "jobTitle jobType location salary applicationDeadline",
  },
];

// 1. Get all applications received by a company
const getCompanyApplications = async (userId) => {
  const jobDrives = await JobDrive.find({
    createdBy: userId,
  }).select("_id");

  const driveIds = jobDrives.map((drive) => drive._id);

  const applications = await Application.find({
    jobDrive: { $in: driveIds },
  })
    .populate(applicationPopulation)
    .sort({ appliedAt: -1 });

  return applications;
};

// 2. Get applications for a particular job drive
const getDriveApplications = async (userId, driveId) => {
  const jobDrive = await JobDrive.findOne({
    _id: driveId,
    createdBy: userId,
  });

  if (!jobDrive) {
    throw new AppError("Job drive not found or access denied", 404);
  }

  const applications = await Application.find({
    jobDrive: jobDrive._id,
  })
    .populate(applicationPopulation)
    .sort({ appliedAt: -1 });

  return applications;
};

// 3. Get a particular application
const getCompanyApplicationById = async (userId, applicationId) => {
  const application = await Application.findById(applicationId).populate(
    applicationPopulation,
  );

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  // Verify that this application belongs to this company's job drive
  const jobDrive = await JobDrive.findOne({
    _id: application.jobDrive._id,
    createdBy: userId,
  });

  if (!jobDrive) {
    throw new AppError("Application not found or access denied", 404);
  }

  return application;
};

// 4. Update application status
const updateApplicationStatus = async (userId, applicationId, newStatus) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  // Verify company ownership
  const jobDrive = await JobDrive.findOne({
    _id: application.jobDrive,
    createdBy: userId,
  });

  if (!jobDrive) {
    throw new AppError("Application not found or access denied", 404);
  }

  // Students who withdrew cannot be processed further
  if (application.status === "withdrawn") {
    throw new AppError("Cannot update a withdrawn application", 400);
  }

  // Final decisions cannot be changed
  if (["selected", "rejected"].includes(application.status)) {
    throw new AppError("This application already has a final decision", 400);
  }

  application.status = newStatus;

  await application.save();

  return application;
};

module.exports = {
  getCompanyApplications,
  getDriveApplications,
  getCompanyApplicationById,
  updateApplicationStatus,
};
