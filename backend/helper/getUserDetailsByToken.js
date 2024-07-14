import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

export const getUserDetailsByToken = async (token) => {
  
  if (!token) {
      return{
        message:"token not found",
        logout:true,
      }
  }
  

  const decode =  jwt.verify(token, process.env.JWT_SECRETKEY);

  console.log("decode"+decode.id)

  const user = await userModel.findById(decode.id).select(" -password");

  console.log(user)
  return user;
};
