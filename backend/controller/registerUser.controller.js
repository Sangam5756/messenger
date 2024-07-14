import userModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const checkemail = await userModel.findOne({ email : data.email});

    if(checkemail) {
      return res.status(400).json({
        message: "Already user exists",
        error: true,
      });
    }

    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(data.password, salt);

    const payload = {
      ...data,
      password:hashpassword,
    };
   

    const user = new userModel(payload);
    const usersave = await user.save();
    
    res.status(201).json({
      message: "user created successfully",
      data: usersave,
      success: true,
      error: false,
    });


  } catch (error) {
    return res.status(500).json({
      message:  error.message,
      error: true,
      success: false,
    });
  }
};


