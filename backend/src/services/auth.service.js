const bcrypt = require("bcrypt");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(
      "User with this email already exists",
      409
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student"
  });
  return user;
};

const loginUser = async ({ email, password }) => {
  // Step 1: Find user by email
  const user = await User.findOne({ email });
  if(!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Step 2: Compare entered password with stored hash
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );
  if(!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Step 3: Generate JWT
  const token = jwt.sign(
    { role: user.role },
    process.env.JWT_SECRET,
    {
      subject: user._id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    }
  );

  // Step 4: Return user and token
  return {
    user,
    token
  };
};

module.exports = {
  registerUser,
  loginUser
};