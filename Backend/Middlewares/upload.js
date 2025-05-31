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
        console.log('Upload destination:', uploadDir);
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = 'student-' + uniqueSuffix + path.extname(file.originalname);
        console.log('Generated filename:', filename);
        console.log('File details:', {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        });
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