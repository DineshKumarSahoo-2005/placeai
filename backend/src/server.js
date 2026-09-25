require("dotenv").config();
const express=require("express");

const healthRoutes=require("./routes/health.routes");

const app=express();

const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/health",healthRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
