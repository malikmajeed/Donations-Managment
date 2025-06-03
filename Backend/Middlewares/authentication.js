import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/users.model.js'
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log('Auth header:', authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized: Token missing or malformed' 
            });
        }

        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Decoded token:', decoded);

        // Get user from database to ensure they still exist
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not found'
            });
        }

        // Attach user info to request
        req.user = {
            id: user._id,
            role: user.role,
            email: user.email
        };

        console.log('Authenticated user:', req.user);
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Token expired'
            });
        }
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Invalid token'
        });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: No user found'
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied! Only admin can access this"
            });
        }

        next();
    } catch (error) {
        console.error('Admin check error:', error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export { authenticateToken, isAdmin };
