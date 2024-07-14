import { getUserDetailsByToken } from "../helper/getUserDetailsByToken.js";
import userModel from "../models/UserModel.js";

export const updateUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDetailsByToken(token);

    const { name, profile_pic } = req.body;
// data is updated
    const updateUser = await userModel.updateOne(
      { _id: user._id },
      {
        name,
        profile_pic,
      }
    );
// send the updated data
    const userInformation = await userModel.findById(user._id);

    res.status(200).json({
      message: "User updated successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
