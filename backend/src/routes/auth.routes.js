const express = require("express");
const { register, login, getMe } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../validators/auth.validator");
const validateRequest = require("../middleware/validateRequest");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Registration
router.post("/register", registerValidation, validateRequest, register);

// Login
router.post("/login", loginValidation, validateRequest, login);

// Protected profile route
router.get("/me", authenticate, getMe);

module.exports = router;
