const healthCheck=(req,res)=>{
  res.status(200).json({
    success:true,
    message:"PlaceAI API is healthy"
  });
};

module.exports={healthCheck};