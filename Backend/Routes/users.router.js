import express from "express";
import { signUp, login, getUser, getAllDonors, deleteUser, updateUser, requestPasswordReset } from "../Controllers/users.controller.js";
import { authenticateToken as Auth, isAdmin } from "../Middlewares/authentication.js";
import {upload} from "../Middlewares/upload.js";

const router = express.Router();

//signup route
router.post("/signup", signUp); //✅ verified

//login route
router.post("/login", login); //✅ verified

//get user route
router.get("/:id", Auth, getUser);

//get all donors route
// when no donors exists it takes lot of time to complete the request
router.get("/donors/", Auth, isAdmin, getAllDonors);//✅ verified

//update user route
router.patch("/update", Auth, upload.single('profile'), updateUser);//✅ verified

//deleting user route
router.delete("/delete/:id", Auth, deleteUser)//✅ verified

//dashboard route
router.get("/dashboard", Auth, getUser);

// forgot password route (send OTP)
router.post("/forgot-password", requestPasswordReset);

export default router;