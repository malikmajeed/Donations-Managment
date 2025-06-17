import Users from "../Models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

//creating a user -- route for adding user
const signUp = async (req, res) => {
    try {
        const { fName, lName, email, role, phone, password, confirmPassword, gender } = req.body;
        console.log('Signup request body:', req.body);

        //checking the required fields
        if(!fName || !lName || !email || !gender){
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }
        if(!password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password & confirm password are required"
            });
        }   

        //checking if the password and confirm password are the same
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        
        //getting password and encrypting it  
        const passwordHash = await bcrypt.hash(password, 10);
        
        //checking if user already exists
        const existingUser = await Users.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // Create new user
        const user = await Users.create({
            fName,
            lName,
            email,
            password: passwordHash,
            role: role || 'donor',
            phone: phone || undefined,
            gender
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                gender: user.gender
            }
        });
    } catch (error) {
        console.error('Signup error: ', error);
        res.status(500).json({
            success: false,
            message: "User creation failed",
            error: error.message
        });
    }
}


//login a user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User with this email does not exist"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }       

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            }, 
            SECRET_KEY, 
            {expiresIn: '24h'}
        );

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                role: user.role,
                fName: user.fName,
                lName: user.lName,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message
        });
    }
}   


//reading user data
const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Format the user data with proper profile URL
        const userData = {
            ...user.toObject(),
            profileUrl: user.profileUrl ? `${process.env.BASE_URL || 'http://localhost:3000'}${user.profileUrl}` : null
        };

        res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            user: userData
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user data",
            error: error.message
        });
    }
};


// getting all users with role donors
const getAllDonors = async (req, res) => {
    console.log('getAllDonors controller executed');
    console.log('User from auth:', req.user); // Log the authenticated user
    
    try {
        const donors = await Users.find({role:"donor"});
        console.log('Number of donors found:', donors.length);
        
        if(donors.length === 0){
            return res.status(404).json({
                success: false,
                message: "No donors found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "All donors fetched successfully",
            donors
        });

    } catch (error) {
        console.error('Error in getAllDonors:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch donors",
            error: error.message
        });
    }
};


//updating a user
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from authenticated user
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // Get the update data from request body
        const updateData = {
            fName: req.body.firstName,
            lName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address
        };

        // If there's a profile file, handle the image update
        if (req.file) {
            try {
                // Get the current user to check for existing profile image
                const currentUser = await Users.findById(userId);
                
                // If user has an existing profile image, delete it
                if (currentUser && currentUser.profileUrl) {
                    const oldImagePath = path.join(__dirname, '..', currentUser.profileUrl);
                    try {
                        await fs.access(oldImagePath); // Check if file exists
                        await fs.unlink(oldImagePath); // Delete the file
                        console.log('Old profile image deleted successfully');
                    } catch (error) {
                        console.error('Error deleting old profile image:', error);
                        // Continue with the update even if deletion fails
                    }
                }

                // Update with new profile image path
                updateData.profileUrl = `/uploads/${req.file.filename}`;
            } catch (error) {
                console.error('Error handling profile image:', error);
                return res.status(500).json({
                    success: false,
                    message: "Error handling profile image",
                    error: error.message
                });
            }
        }

        // Update the user
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Send the complete user data including the profile URL
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                fName: updatedUser.fName,
                lName: updatedUser.lName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                gender: updatedUser.gender,
                address: updatedUser.address,
                profileUrl: updatedUser.profileUrl ? `${process.env.BASE_URL || 'http://localhost:3000'}${updatedUser.profileUrl}` : null
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
};




///Deleting a user

const deleteUser = async(req,res)=>{
  try {
     const userID = req.params?.id;
    if(!userID){
        res.status(400).json({
            success:false,
            message:"No user Id found"
        })
    }
    const isUserDeleted =await Users.findByIdAndDelete(userID);

    if (!isUserDeleted){
        res.status(400).json({
            success:false,
            message:"User Doesn't exists"
        })    }

        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
    

}catch(error){
    console.log(`error has occured while deleting a user : ${error.message}`);
    res.status(500).send('An Error has occured while deleting User')
}

}



export {signUp, login, getUser, getAllDonors, updateUser, deleteUser};