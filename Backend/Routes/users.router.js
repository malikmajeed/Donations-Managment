import express from "express";
import { signUp, login, getUser, getAllUsers,getAllDonors, deleteUser, updateUser, requestPasswordReset } from "../Controllers/users.controller.js";
import { authenticateToken as Auth, isAdmin } from "../Middlewares/authentication.js";
import {upload} from "../Middlewares/upload.js";

const router = express.Router();

//signup route
router.post("/signup", signUp); //✅ verified

//login route
router.post("/login", login); //✅ verified

// get all users route
router.get("/users/",Auth,isAdmin, getAllUsers);//✅ verified

//get all donors route
// when no donors exists it takes lot of time to complete the request
router.get("/donors/",Auth,isAdmin, getAllDonors);//✅ verified

//get user route (must come after specific routes to avoid conflicts)
router.get("/:id", Auth, getUser);

//update user route
router.patch("/update", Auth, upload.single('profile'), updateUser);//✅ verified

//deleting user route
router.delete("/delete/:id", Auth, deleteUser)//✅ verified

//dashboard route
router.get("/dashboard", Auth, getUser);

// forgot password route (send OTP)
router.post("/forget-password", requestPasswordReset);

export default router;