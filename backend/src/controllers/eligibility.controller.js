const eligibilityService = require("../services/eligibility.service");

const checkEligibility = async (req, res, next) => {
  try {
    const result = await eligibilityService.checkEligibility(
      req.user.id,
      req.params.id,
    );

    res.status(200).json({
      success: true,
      message: "Eligibility checked successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkEligibility,
};
