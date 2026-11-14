const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [150, "Company name cannot exceed 150 characters"],
    },

    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
    },

    website: {
      type: String,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      trim: true,
    },

    headquarters: {
      type: String,
      trim: true,
    },

    contactPerson: {
      type: String,
      trim: true,
    },

    contactEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
