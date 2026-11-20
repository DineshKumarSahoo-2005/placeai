const Application = require("../models/Application");
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
    select: "jobTitle jobType location salary applicationDeadline company",
    populate: {
      path: "company",
      select: "companyName industry",
    },
  },
];

// 1. Get all applications with filters and pagination
const getAllApplications = async (filters) => {
  const { status, jobDrive, page = 1, limit = 10 } = filters;

  const query = {};

  if (status) {
    query.status = status;
  }

  if (jobDrive) {
    query.jobDrive = jobDrive;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [applications, total] = await Promise.all([
    Application.find(query)
      .populate(applicationPopulation)
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(limitNumber),

    Application.countDocuments(query),
  ]);

  return {
    applications,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

// 2. Get individual application
const getApplicationById = async (applicationId) => {
  const application = await Application.findById(applicationId).populate(
    applicationPopulation,
  );

  if (!application) {
    throw new AppError("Application not found", 404);
  }

  return application;
};

// 3. Get application statistics
const getApplicationStats = async () => {
  const stats = await Application.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
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

  stats.forEach((item) => {
    statusCounts[item._id] = item.count;
  });

  const totalApplications = Object.values(statusCounts).reduce(
    (total, count) => total + count,
    0,
  );

  return {
    totalApplications,
    statusCounts,
  };
};

module.exports = {
  getAllApplications,
  getApplicationById,
  getApplicationStats,
};
