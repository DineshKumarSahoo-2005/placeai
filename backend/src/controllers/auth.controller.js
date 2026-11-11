const { registerUser, loginUser } = require("../services/auth.service");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({
      name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({
      email,
      password,
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
