import bcryptjs from "bcryptjs";
import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const checkPassword = async (req, res) => {
  try {
    const { password, userId } = req.body;

    const user = await userModel.findById(userId);
    

    const verifyPassword = await bcryptjs.compare(password, user.password);
    

    if (!verifyPassword) {
      return res.status(400).json({
        message: "please check password",
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

                            // data      secretkey                 validity
    const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, {expiresIn: "1d",});
    
    // token should store in browser
    const cookieOptions ={
      httpOnly:true,
        secure:false,
    }

    return res.cookie( "token" , token , cookieOptions ).status(200).json({
      message:"Login Succesfully",
      token:token,
      success:true,
    })
    


//  to store the token in the browser
//                     name    token to store  optionsvalue  
    // return res.cookie('token',    token,        cookieOption).status(200).json({
    //   message: "login successfully",
    //   token: token,
    //   success: true,
    //   error: false,
    // });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
