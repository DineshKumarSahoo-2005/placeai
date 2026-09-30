const bcrypt=require("bcrypt");
const User=require("../models/User");
const registerUser=async({name,email,password,role})=>{
  const existingUser=await User.findOne({email});
  if(existingUser)
  {
    const error=new error("User with this email already exists");
    error.statusCode=409;
    throw error;
  }
  const hashedPassword=await bcrypt.hash(password,12);
  const user=await User.create({
    name,
    email,
    password:hashedPassword,
    role
  });
  return user;
}

module.exports={registerUser};