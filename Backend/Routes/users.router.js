import express from "express";
import { signUp, login, getUser, getAllDonors, updateUser } from "../Controllers/users.controller";

const router = express.Router();


//signup route
router.post("/signup", signUp);

//login route
router.post("/login", login);

//get user route
router.get("/user", getUser);

//get all donors route
router.get("/donors", getAllDonors);

//update user route
router.patch("/update", updateUser);


export default router;