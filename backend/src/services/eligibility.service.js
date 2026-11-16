const StudentProfile = require("../models/StudentProfile");
const JobDrive = require("../models/JobDrive");
const AppError = require("../utils/AppError");

// Compare text without case sensitivity or extra spaces.
const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const checkEligibility = async (userId, driveId) => {
  // Find the published drive
  const jobDrive = await JobDrive.findOne({
    _id: driveId,
    status: "published",
    applicationDeadline: { $gte: new Date() },
  }).populate("company", "companyName industry");

  if (!jobDrive) {
    throw new AppError(
      "Published job drive not found or application deadline has passed",
      404,
    );
  }

  // Find the student's profile
  const student = await StudentProfile.findOne({
    user: userId,
  });

  if (!student) {
    throw new AppError("Please complete your student profile first", 404);
  }

  const criteria = jobDrive.eligibility;
  const checks = [];

  // 1. CGPA check
  checks.push({
    criterion: "CGPA",
    required: criteria.minimumCGPA,
    actual: student.cgpa ?? null,
    passed:
      student.cgpa !== undefined &&
      student.cgpa !== null &&
      student.cgpa >= criteria.minimumCGPA,
    message:
      student.cgpa == null
        ? "Please add your CGPA to your profile"
        : student.cgpa >= criteria.minimumCGPA
          ? "CGPA requirement satisfied"
          : `Minimum CGPA required is ${criteria.minimumCGPA}`,
  });

  // 2. Active backlogs check
  checks.push({
    criterion: "Active Backlogs",
    required: `Maximum ${criteria.maximumBacklogs}`,
    actual: student.activeBacklogs ?? null,
    passed:
      student.activeBacklogs !== undefined &&
      student.activeBacklogs !== null &&
      student.activeBacklogs <= criteria.maximumBacklogs,
    message:
      student.activeBacklogs == null
        ? "Please add your active backlog count to your profile"
        : student.activeBacklogs <= criteria.maximumBacklogs
          ? "Backlog requirement satisfied"
          : `Maximum allowed backlogs are ${criteria.maximumBacklogs}`,
  });

  // 3. Branch check
  const allowedBranches = (criteria.eligibleBranches || []).map(normalize);

  const branchPassed =
    allowedBranches.length === 0 ||
    (student.branch && allowedBranches.includes(normalize(student.branch)));

  checks.push({
    criterion: "Branch",
    required:
      criteria.eligibleBranches.length > 0
        ? criteria.eligibleBranches
        : "All branches",
    actual: student.branch || null,
    passed: Boolean(branchPassed),
    message: !student.branch
      ? "Please add your branch to your profile"
      : branchPassed
        ? "Branch requirement satisfied"
        : "Your branch is not eligible for this drive",
  });

  // 4. Graduation year check
  checks.push({
    criterion: "Graduation Year",
    required: criteria.graduationYear,
    actual: student.graduationYear ?? null,
    passed:
      student.graduationYear !== undefined &&
      student.graduationYear !== null &&
      student.graduationYear === criteria.graduationYear,
    message:
      student.graduationYear == null
        ? "Please add your graduation year to your profile"
        : student.graduationYear === criteria.graduationYear
          ? "Graduation year requirement satisfied"
          : `Required graduation year is ${criteria.graduationYear}`,
  });

  // 5. Required skills check
  const studentSkills = (student.skills || []).map(normalize);
  const requiredSkills = criteria.requiredSkills || [];

  const missingSkills = requiredSkills.filter(
    (skill) => !studentSkills.includes(normalize(skill)),
  );

  const skillsPassed = missingSkills.length === 0;

  checks.push({
    criterion: "Skills",
    required: requiredSkills,
    actual: student.skills || [],
    passed: skillsPassed,
    missingSkills,
    message: skillsPassed
      ? "Required skills satisfied"
      : `Missing required skills: ${missingSkills.join(", ")}`,
  });

  const eligible = checks.every((check) => check.passed);

  return {
    eligible,
    jobDrive: {
      id: jobDrive._id,
      jobTitle: jobDrive.jobTitle,
      company: jobDrive.company,
      applicationDeadline: jobDrive.applicationDeadline,
    },
    checks,
  };
};

module.exports = {
  checkEligibility,
};
