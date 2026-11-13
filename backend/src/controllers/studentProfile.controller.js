const studentProfileService = require("../services/studentProfile.service");

// Create profile
const createProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfileService.createProfile(
      userId,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Student profile created successfully",
      data: {
        profile,
        completionPercentage:
          studentProfileService.calculateProfileCompletion(profile)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get profile
const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfileService.getProfile(userId);
    res.status(200).json({
      success: true,
      message: "Student profile retrieved successfully",
      data: {
        profile,
        completionPercentage:
          studentProfileService.calculateProfileCompletion(profile)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update profile
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await studentProfileService.updateProfile(
      userId,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      data: {
        profile,
        completionPercentage:
          studentProfileService.calculateProfileCompletion(profile)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile
};
