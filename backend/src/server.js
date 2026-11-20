require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const rbacRoutes = require("./routes/rbac.routes");
const studentProfileRoutes = require("./routes/studentProfile.routes");
const companyRoutes = require("./routes/company.routes");
const jobDriveRoutes = require("./routes/jobDrive.routes");
const applicationRoutes = require("./routes/application.routes");
const companyApplicationRoutes = require("./routes/companyApplication.routes");
const adminApplicationRoutes = require("./routes/adminApplication.routes");

const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/rbac", rbacRoutes);
app.use("/api/v1/students", studentProfileRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/job-drives", jobDriveRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/company/applications", companyApplicationRoutes);
app.use("/api/v1/admin/applications", adminApplicationRoutes);

app.use(notFound);
app.use(errorHandler);

// Centralized error handler
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
