const mongoose=require("mongoose");
const userSchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,"Name is required"],
      trim:true,
      minlength:[2,"Name must be at least 2 characters long"],
      maxlength:[100,"Name cannot exceed 100 characters"]
    },
    email:{
      type:String,
      required:[true,"Email is required"],
      unique:true,
      lowercase:true,
      trim:true
    },
    password:{
      type:String,
      required:[true,"Password is required"],
      minlength:[6,"Password must be at least 6 characters long"]
    },
    role:{
      type:String,
      enum:["student","comapany","admin","interviewer"],
      default:"student"
    },
  },
  {
      timestamps:true
  }
);

const User=mongoose.model("User",userSchema);
module.exports=User;