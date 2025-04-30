import Users from "../Models/users.model.js";
import bcrypt from "bcrypt";
//creating a user
const signUp = async (req, res) => {
    try {
     
        const {fName, lName, email,role, phone, profileUrl} = req.body;

     //getting password and encrypting it   
    const password = await bcrypt.hash(req.body.password, 10);
    //checking the password so its not null
    if(!password){
        return res.status(400).json({
            success:false,
            message:"Password is required"
        })
    }   
    //checking the required fields
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


// getting all users with role donors

const getAllDonors = async (req, res) => {
    try {
        const donors = await Users.find({role:"donor"});
        res.status(200).json({
            success:true,
            message:"All donors fetched successfully",
            donors
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to fetch donors",
            error:error.message
        })
    }
}


//updating a user
const updateUser = async (req, res) => {
    try{

        const userId = req.body._id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User ID is required"
            })
        }

        const user = await Users.findByIdAndUpdate(userId, req.body, {new:true});
        if(!user){
            return res.status(400).json({
                
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to update user",
            error:error.message
        })
    }
}




export {signUp, login, getUser, getAllDonors, updateUser};