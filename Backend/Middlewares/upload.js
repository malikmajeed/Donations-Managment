import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'students');
if (!fs.existsSync(uploadDir)) {
    console.log('Creating upload directory:', uploadDir);
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine if this is a user or student upload
        let destDir;
        // If the route contains 'user' or the field is 'profile', save to users
        if (
            (req.baseUrl && req.baseUrl.includes('/user')) ||
            (file.fieldname === 'profile')
        ) {
            destDir = path.join(__dirname, '..', 'uploads', 'users');
        } else {
            destDir = path.join(__dirname, '..', 'uploads', 'students');
        }
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        console.log('Upload destination:', destDir);
        cb(null, destDir);
    },
    filename: function (req, file, cb) {
        // Get user ID from the authenticated user
        const userId = req.user.id;
        if (!userId) {
            return cb(new Error('User ID not found'), false);
        }
        // Create filename with user ID and timestamp
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const filename = `user-${userId}-${timestamp}${extension}`;
        cb(null, filename);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    console.log('Processing file in filter:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        fieldname: file.fieldname
    });

    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        console.log('File rejected: not an image');
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    console.log('File accepted');
    cb(null, true);
};

// Configure upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    }
});

// Error handling middleware
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 5MB'
            });
        }
        return res.status(400).json({
            success: false,
            message: `Upload error: ${err.message}`
        });
    } else if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

export { upload, handleUploadError }; 