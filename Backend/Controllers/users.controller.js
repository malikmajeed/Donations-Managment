import Users from "../Models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//creating a user
const signUp = async (req, res) => {
    try {
     
        const {fName, lName, email,role, phone, profileUrl} = req.body;
        const {pasword, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            })
        }

    const password = await bcrypt.hash(req.body.password, 10);
    
        if(!fName || !lName || !email){
            return res.status(400).json({
                success:false,
                message:"Required fields are missing"
            })
        }
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User with this email already exists"
            })
        }
        const user = await Users.create({
        fName, lName, email, password, role, phone, profileUrl
    })
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User creation failed",
            error:error.message
        })
    }
}


//login a user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User with this email does not exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }       

     

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User login failed",
            error:error.message
        })
    }
}   


//reading user data
const getUser = async (req, res) => {
    try {
        const userId = req.body._id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User ID is required"
            })
        }   
        const user = await Users.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }   
        res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            user
        })

    } catch (error) {
        
    }
}