const { registerUser } = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({
      name,
      email,
      password
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register
};