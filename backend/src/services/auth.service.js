const bcrypt = require("bcrypt");
const User = require("../models/User");
const AppError = require("../utils/AppError");
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

module.exports = {
  registerUser
};