import userModel from "../models/UserModel.js";

export const checkEmail = async (req, res) => {
  try { 
    const { email } = req.body;
    
    //  - password beacause we dont want that field to be in response its already store in the database

    const checkemail = await userModel.findOne({ email }).select("-password");

    if (!checkemail) {
      res.status(400).json({
        message: "User not exists",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "email verify",
      data: checkemail,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

