require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const rbacRoutes = require("./routes/rbac.routes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/rbac", rbacRoutes);

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