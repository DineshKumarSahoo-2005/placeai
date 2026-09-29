const mongoose=require("mongoose");

const healthCheck=(req,res)=>{
  const dbState=mongoose.connection.readyState;
  const databaseStatus=dbState==1?"connected":"disconnected";
  res.status(200).json({
    success:true,
    server:"healthy",
    database:databaseStatus
  });
};

module.exports={healthCheck};