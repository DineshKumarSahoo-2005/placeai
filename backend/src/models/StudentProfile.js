const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
      trim: true
    },
    description:{
      type: String,
      trim: true,
      maxlength: 1000
    },
    technologies:[{
      type: String,
      trim: true
    }],
    githubUrl:{
      type: String,
      trim: true
    },
    liveUrl:{
      type: String,
      trim: true
    }
  },
  { _id: true }
);

const certificationSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true
    },
    issuingOrganization:{
      type: String,
      required: true,
      trim: true
    },
    issueDate:{
      type: Date
    },
    credentialUrl:{
      type: String,
      trim: true
    }
  },
  { _id: true }
);

const studentProfileSchema = new mongoose.Schema(
  {
    // Reference to User collection
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    // Personal Information
    phone:{
      type: String,
      trim: true
    },

    // Academic Information
    rollNumber:{
      type: String,
      trim: true,
      uppercase: true
    },

    branch:{
      type: String,
      trim: true
    },

    department:{
      type: String,
      trim: true
    },

    currentSemester:{
      type: Number,
      min: 1,
      max: 12
    },

    cgpa:{
      type: Number,
      min: 0,
      max: 10
    },

    activeBacklogs:{
      type: Number,
      min: 0,
      default: 0
    },

    graduationYear:{
      type: Number
    },

    // Technical Skills
    skills:[{
      type: String,
      trim: true
    }],

    // Projects
    projects: [projectSchema],

    // Certifications
    certifications: [certificationSchema]
  },
  {
    timestamps: true
  }
);

const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);

module.exports = StudentProfile;
