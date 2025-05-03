import express from "express";
import { signUp, login, getUser, getAllDonors, updateUser } from "../Controllers/users.controller.js";

const router = express.Router();


//signup route
router.post("/signup", signUp); //✅ verified

//login route
router.post("/login", login); //✅ verified

//get user route
router.get("/:id", getUser); //✅ verified

//get all donors route
router.get("/donors", getAllDonors);

//update user route
router.patch("/update", updateUser);


export default router;