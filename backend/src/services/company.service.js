const Company = require("../models/Company");
const AppError = require("../utils/AppError");

// Only allow company-editable fields
const pickCompanyData = (data) => {
  const allowedFields = [
    "companyName",
    "industry",
    "website",
    "description",
    "headquarters",
    "contactPerson",
    "contactEmail",
    "contactPhone",
    "companySize",
  ];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );
};

// Create company profile
const createCompanyProfile = async (userId, companyData) => {
  const existingCompany = await Company.findOne({
    user: userId,
  });
  if (existingCompany) {
    throw new AppError("Company profile already exists", 409);
  }
  const company = await Company.create({
    ...pickCompanyData(companyData),
    user: userId,
  });

  return company;
};

// Get logged-in company's profile
const getCompanyProfile = async (userId) => {
  const company = await Company.findOne({
    user: userId,
  }).populate("user", "name email role");
  if (!company) {
    throw new AppError("Company profile not found", 404);
  }
  return company;
};

// Update company profile
const updateCompanyProfile = async (userId, companyData) => {
  const company = await Company.findOneAndUpdate(
    { user: userId },
    {
      $set: pickCompanyData(companyData),
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate("user", "name email role");

  if (!company) {
    throw new AppError("Company profile not found", 404);
  }

  return company;
};

module.exports = {
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
};
