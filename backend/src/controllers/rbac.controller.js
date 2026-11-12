const getStudentDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student dashboard accessed successfully",
    data: {
      userId: req.user.id,
      role: req.user.role,
      dashboard: "Student Dashboard"
    }
  });
};

const getCompanyDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Company dashboard accessed successfully",
    data: {
      userId: req.user.id,
      role: req.user.role,
      dashboard: "Company Dashboard"
    }
  });
};

const getAdminDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin dashboard accessed successfully",
    data: {
      userId: req.user.id,
      role: req.user.role,
      dashboard: "Admin Dashboard"
    }
  });
};

const getInterviewerDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Interviewer dashboard accessed successfully",
    data: {
      userId: req.user.id,
      role: req.user.role,
      dashboard: "Interviewer Dashboard"
    }
  });
};

module.exports = {
  getStudentDashboard,
  getCompanyDashboard,
  getAdminDashboard,
  getInterviewerDashboard
};
