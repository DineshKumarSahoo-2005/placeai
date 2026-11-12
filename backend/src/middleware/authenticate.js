const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const authenticate = async (req, res, next) => {
  try {
    // Step 1: Get authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    // Step 2: Extract token
    const token = authHeader.split(" ")[1];

    // Step 3: Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Step 4: Find current user in database
    const user = await User.findById(decoded.sub)
      .select("_id role");
    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    // Step 5: Attach current user information
    req.user = {
      id: user._id.toString(),
      role: user.role
    };

    // Step 6: Continue
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
