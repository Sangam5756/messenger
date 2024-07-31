import { getUserDetailsByToken } from "../helper/getUserDetailsByToken.js";

export const userDetails = async (req, res) => {
  try {
    const token = req.cookies?.token || "";   
    // console.log(token)
    

    const user = await getUserDetailsByToken(token);
    // console.log("user"+user);
 
    
    return res.status(200).json({
      data:user,
      message: "user details",
    
    }); 

  } catch (error) {
    
    return res.status(500).json({
      message: error.message,
      success: true,
      error: false,
    });
  }
};
