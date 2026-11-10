const express = require("express");
const { register } = require("../controllers/auth.controller");
const { registerValidation } = require("../validators/auth.validator");
const validateRequest = require("../middleware/validateRequest");
const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);

module.exports = router;
