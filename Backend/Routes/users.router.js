import express from "express";
import { signUp, login, getUser, getAllDonors, deleteUser, updateUser } from "../Controllers/users.controller.js";
import { authenticateToken as Auth, isAdmin } from "../Middlewares/authentication.js";
const router = express.Router();


//signup route
router.post("/signup", signUp); //✅ verified

//login route
router.post("/login", login); //✅ verified

//get user route

//get all donors route
// when no donors exists it takes lot of time to complete the request
router.get("/donors/", Auth,isAdmin, getAllDonors);//✅ verified

//update user route
router.patch("/update", Auth, updateUser);//✅ verified

//deleting user route
router.delete("/delete/:id", Auth, deleteUser)//✅ verified

router.get("/:id", Auth, getUser); //✅ verified


export default router;