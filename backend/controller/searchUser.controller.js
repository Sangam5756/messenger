import userModel from "../models/UserModel.js";

export const searchUser = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");

    const user = await userModel.find({
      $or: [{ name: query }, { email: query }],
    });

    return res.status(200).json({
      message: "all user",
      data: user,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};



