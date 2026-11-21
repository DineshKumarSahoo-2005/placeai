const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");
const Company = require("../models/Company");
const JobDrive = require("../models/JobDrive");
const Application = require("../models/Application");

// 1. Overall dashboard overview
const getOverview = async () => {
  const [
    totalStudents,
    totalStudentProfiles,
    totalCompanies,
    verifiedCompanies,
    totalJobDrives,
    publishedJobDrives,
    totalApplications,
    selectedApplications,
    shortlistedApplications,
  ] = await Promise.all([
    User.countDocuments({ role: "student" }),
    StudentProfile.countDocuments(),
    Company.countDocuments(),
    Company.countDocuments({ verificationStatus: "verified" }),
    JobDrive.countDocuments(),
    JobDrive.countDocuments({ status: "published" }),
    Application.countDocuments(),
    Application.countDocuments({ status: "selected" }),
    Application.countDocuments({ status: "shortlisted" }),
  ]);

  return {
    totalStudents,
    totalStudentProfiles,
    totalCompanies,
    verifiedCompanies,
    totalJobDrives,
    publishedJobDrives,
    totalApplications,
    selectedApplications,
    shortlistedApplications,
  };
};

// 2. Applications by status
const getApplicationsByStatus = async () => {
  const results = await Application.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  const statusCounts = {
    applied: 0,
    "under-review": 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
    withdrawn: 0,
  };

  results.forEach((item) => {
    statusCounts[item._id] = item.count;
  });

  return statusCounts;
};

// 3. Top companies by application count
const getTopCompanies = async () => {
  const results = await Application.aggregate([
    {
      $lookup: {
        from: "jobdrives",
        localField: "jobDrive",
        foreignField: "_id",
        as: "drive",
      },
    },
    {
      $unwind: "$drive",
    },
    {
      $lookup: {
        from: "companies",
        localField: "drive.company",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $unwind: "$company",
    },
    {
      $group: {
        _id: "$company._id",
        companyName: { $first: "$company.companyName" },
        industry: { $first: "$company.industry" },
        totalApplications: { $sum: 1 },
        selectedApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "selected"] }, 1, 0],
          },
        },
        shortlistedApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "shortlisted"] }, 1, 0],
          },
        },
      },
    },
    {
      $sort: { totalApplications: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  return results;
};

// 4. Branch-wise statistics
const getBranchStatistics = async () => {
  const results = await Application.aggregate([
    {
      $lookup: {
        from: "studentprofiles",
        localField: "student",
        foreignField: "_id",
        as: "studentProfile",
      },
    },
    {
      $unwind: "$studentProfile",
    },
    {
      $group: {
        _id: "$studentProfile.branch",
        totalApplications: { $sum: 1 },
        selectedApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "selected"] }, 1, 0],
          },
        },
        shortlistedApplications: {
          $sum: {
            $cond: [{ $eq: ["$status", "shortlisted"] }, 1, 0],
          },
        },
      },
    },
    {
      $sort: { totalApplications: -1 },
    },
  ]);

  return results;
};

module.exports = {
  getOverview,
  getApplicationsByStatus,
  getTopCompanies,
  getBranchStatistics,
};
