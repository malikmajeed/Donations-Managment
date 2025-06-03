import Users from "../Models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

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
            {expiresIn: '1h'}
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
        console.log(req.params.id);
        const userId= req.params.id;
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
    try{

        const userId = req.body._id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User ID is required"
            })
        }

        const user = await Users.findByIdAndUpdate(userId, req.body, {new:true}, {runValidators: true});
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