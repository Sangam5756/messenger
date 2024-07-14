export const logout = async (req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    return res.cookie("token",'', cookieOptions).status(200).json({
      message: "session-out",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error:true,
    });
  }
};
