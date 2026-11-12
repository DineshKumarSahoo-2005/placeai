const AppError = require("../utils/AppError");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check whether user information exists
    if(!req.user){
      return next(
        new AppError("Authentication required", 401)
      );
    }

    // Check whether user's role is allowed
    if(!allowedRoles.includes(req.user.role)){
      return next(
        new AppError(
          "You do not have permission to perform this action",
          403
        )
      );
    }

    // User is authorized
    next();
  };
};

module.exports = authorizeRoles;
