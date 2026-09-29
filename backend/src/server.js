require("dotenv").config();
const express=require("express");

const connectDB=require("./config/database");
const healthRoutes=require("./routes/health.routes");

const app=express();

const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/health",healthRoutes);

const startServer=async()=>{
  await connectDB();
  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
};

startServer();

