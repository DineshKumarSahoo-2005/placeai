const StudentProfile = require("../models/StudentProfile");
const AppError = require("../utils/AppError");

const pickProfileData = (data) => {
  const allowedFields = [
    "phone",
    "rollNumber",
    "branch",
    "department",
    "currentSemester",
    "cgpa",
    "activeBacklogs",
    "graduationYear",
    "skills",
    "projects",
    "certifications",
  ];

  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key)),
  );
};

// Calculate student profile completion percentage
const calculateProfileCompletion = (profile) => {
  const checks = [
    Boolean(profile.phone),
    Boolean(profile.rollNumber),
    Boolean(profile.branch),
    Boolean(profile.department),
    Boolean(profile.currentSemester),
    profile.cgpa !== undefined && profile.cgpa !== null,
    profile.graduationYear !== undefined && profile.graduationYear !== null,
    Array.isArray(profile.skills) && profile.skills.length > 0,
    Array.isArray(profile.projects) && profile.projects.length > 0,
    Array.isArray(profile.certifications) && profile.certifications.length > 0,
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
};

// Create student profile
const createProfile = async (userId, profileData) => {
  const existingProfile = await StudentProfile.findOne({
    user: userId,
  });
  if (existingProfile) {
    throw new AppError("Student profile already exists", 409);
  }
  const profile = await StudentProfile.create({
    ...pickProfileData(profileData),
    user: userId,
  });
  return profile;
};

// Get logged-in student's profile
const getProfile = async (userId) => {
  const profile = await StudentProfile.findOne({
    user: userId,
  }).populate("user", "name email role");
  if (!profile) {
    throw new AppError("Student profile not found", 404);
  }
  return profile;
};

// Update student profile
const updateProfile = async (userId, profileData) => {
  const profile = await StudentProfile.findOneAndUpdate(
    { user: userId },
    { $set: pickProfileData(profileData) },
    {
      new: true,
      runValidators: true,
    },
  ).populate("user", "name email role");
  if (!profile) {
    throw new AppError("Student profile not found", 404);
  }
  return profile;
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  calculateProfileCompletion,
};
