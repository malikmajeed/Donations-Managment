import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directories exist
const uploadDirs = {
    students: path.join(__dirname, '..', 'uploads', 'students'),
    users: path.join(__dirname, '..', 'uploads', 'users'),
    causes: path.join(__dirname, '..', 'uploads', 'causes'),
};
Object.values(uploadDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        console.log('Creating upload directory:', dir);
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Helper to determine upload type
function getUploadType(req, file) {
    // Priority: fieldname, then route
    if (file.fieldname === 'cause' || (req.baseUrl && req.baseUrl.includes('/cause'))) {
        return 'causes';
    }
    if (file.fieldname === 'user' || (req.baseUrl && req.baseUrl.includes('/user'))) {
        return 'users';
    }
    // Default to students
    return 'students';
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const type = getUploadType(req, file);
        const destDir = uploadDirs[type];
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        console.log('Upload destination:', destDir);
        cb(null, destDir);
    },
    filename: function (req, file, cb) {
        // Get user ID from the authenticated user if available
        const userId = req.user && req.user.id ? req.user.id : 'anonymous';
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const type = getUploadType(req, file);
        let prefix = 'student';
        if (type === 'users') prefix = 'user';
        if (type === 'causes') prefix = 'cause';
        const filename = `${prefix}-${userId}-${timestamp}${extension}`;
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