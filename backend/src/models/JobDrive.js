const mongoose = require("mongoose");

const eligibilitySchema = new mongoose.Schema(
  {
    minimumCGPA: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },

    maximumBacklogs: {
      type: Number,
      min: 0,
      default: 0,
    },

    eligibleBranches: [
      {
        type: String,
        trim: true,
      },
    ],

    graduationYear: {
      type: Number,
      required: true,
    },

    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { _id: false },
);

const jobDriveSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["full-time", "internship", "internship-to-full-time"],
      default: "full-time",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      min: 0,
      required: true,
    },

    eligibility: {
      type: eligibilitySchema,
      required: true,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "closed", "cancelled"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

const JobDrive = mongoose.model("JobDrive", jobDriveSchema);

module.exports = JobDrive;
