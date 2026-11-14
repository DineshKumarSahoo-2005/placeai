const companyService = require("../services/company.service");

// Create company profile
const createCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const company = await companyService.createCompanyProfile(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Company profile created successfully",
      data: {
        company,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get company profile
const getCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const company = await companyService.getCompanyProfile(userId);

    res.status(200).json({
      success: true,
      message: "Company profile retrieved successfully",
      data: {
        company,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update company profile
const updateCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const company = await companyService.updateCompanyProfile(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      data: {
        company,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
};
