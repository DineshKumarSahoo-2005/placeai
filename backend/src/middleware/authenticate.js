const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {
  try {
    // Step 1: Get Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    // Step 2: Extract token
    const token = authHeader.split(" ")[1];

    // Step 3: Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Step 4: Attach user information to request
    req.user = {
      id: decoded.sub,
      role: decoded.role
    };

    // Step 5: Continue to next middleware
    next();

  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(
        new AppError("Invalid or expired token", 401)
      );
    }

    next(error);
  }
};

module.exports = authenticate;
