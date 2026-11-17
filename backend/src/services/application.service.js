const Application = require("../models/Application");
const StudentProfile = require("../models/StudentProfile");
const JobDrive = require("../models/JobDrive");
const eligibilityService = require("./eligibility.service");
const AppError = require("../utils/AppError");

// 1. Apply for a job drive
const applyForJobDrive = async (userId, driveId, coverLetter) => {
  // Find the student's profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    throw new AppError(
      "Please create your student profile before applying",
      404,
    );
  }

  // Find an active published drive
  const jobDrive = await JobDrive.findOne({
    _id: driveId,
    status: "published",
    applicationDeadline: { $gte: new Date() },
  });

  if (!jobDrive) {
    throw new AppError(
      "Job drive not found or application deadline has passed",
      404,
    );
  }

  // Check eligibility again before applying
  const eligibility = await eligibilityService.checkEligibility(
    userId,
    driveId,
  );

  if (!eligibility.eligible) {
    throw new AppError("You are not eligible for this job drive", 400);
  }

  // Prevent duplicate applications
  const existingApplication = await Application.findOne({
    student: student._id,
    jobDrive: jobDrive._id,
  });

  if (existingApplication) {
    throw new AppError("You have already applied for this job drive", 409);
  }

  // Create application
  let application;

  try {
    application = await Application.create({
      student: student._id,
      jobDrive: jobDrive._id,
      coverLetter,
      status: "applied",
    });
  }catch (error) {
    if (error.code === 11000) {
      throw new AppError("You have already applied for this job drive", 409);
    }
    throw error;
  }

  return application;
};

// 2. Get all applications of logged-in student
const getMyApplications = async (userId) => {
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    throw new AppError("Student profile not found", 404);
  }

  const applications = await Application.find({
    student: student._id,
  })
    .populate({
      path: "jobDrive",
      select:
        "jobTitle company location salary jobType applicationDeadline status",
      populate: {
        path: "company",
        select: "companyName industry",
      },
    })
    .sort({ appliedAt: -1 });

  return applications;
};

// 3. Get one application belonging to logged-in student
const getApplicationById = async (applicationId, userId) => {
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    throw new AppError("Student profile not found", 404);
  }

  const application = await Application.findOne({
    _id: applicationId,
    student: student._id,
  }).populate({
    path: "jobDrive",
    populate: {
      path: "company",
      select: "companyName industry",
    },
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  return application;
};

// 4. Withdraw an application
const withdrawApplication = async (applicationId, userId) => {
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    throw new AppError("Student profile not found", 404);
  }

  const application = await Application.findOne({
    _id: applicationId,
    student: student._id,
  });

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  if (application.status === "withdrawn") {
    throw new AppError("Application is already withdrawn", 400);
  }

  if (["selected", "rejected"].includes(application.status)) {
    throw new AppError(
      "You cannot withdraw an application with a final decision",
      400,
    );
  }

  application.status = "withdrawn";
  application.withdrawnAt = new Date();

  await application.save();

  return application;
};

module.exports = {
  applyForJobDrive,
  getMyApplications,
  getApplicationById,
  withdrawApplication,
};
