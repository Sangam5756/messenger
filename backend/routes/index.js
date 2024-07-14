import express from "express";
const router = express.Router();

import { registerUser } from "../controller/registerUser.controller.js";
import { checkEmail } from "../controller/checkEmail.controller.js";
import { checkPassword } from "../controller/checkPassword.controller.js";
import { userDetails } from "../controller/userDetails.controller.js";
import { logout } from "../controller/logout.controller.js";
import { updateUserDetails } from "../controller/updateUserDetail.controller.js";

// create user api
router.post("/register", registerUser);
router.post("/email", checkEmail);
router.post("/password", checkPassword);

// login userDetails
router.get("/user-details", userDetails);

// logout user
router.get("/logout", logout);

// update details
router.post("/update-user",updateUserDetails)

export default router;
