const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // Student who submitted the application
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
      index: true,
    },

    // Job drive for which the student applied
    jobDrive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobDrive",
      required: true,
      index: true,
    },

    // Current application status
    status: {
      type: String,
      enum: [
        "applied",
        "under-review",
        "shortlisted",
        "selected",
        "rejected",
        "withdrawn",
      ],
      default: "applied",
    },

    // Optional message from student
    coverLetter: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    // Application submission date
    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // Date when student withdraws
    withdrawnAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate applications for the same job drive
applicationSchema.index(
  {
    student: 1,
    jobDrive: 1,
  },
  {
    unique: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
