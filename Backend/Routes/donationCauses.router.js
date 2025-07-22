import express from 'express';
const router = express.Router();

import {
    createDonationCause,
    getAllDonationCauses,
    getDonationCauseById,
    updateDonationCause,
    deleteDonationCause,
    updateAmountCollected,
    getCausesByType,
    getUrgentCauses,
    getCausesStatistics
} from '../Controllers/donationCauses.controller.js';

import { authenticateToken as Auth, isAdmin } from '../Middlewares/authentication.js';
import { upload, handleUploadError } from '../Middlewares/upload.js';

// Public routes (no authentication required)
router.get('/getAllCauses', getAllDonationCauses);
router.get('/getCauseById/:id', getDonationCauseById);
router.get('/getCausesByType/:type', getCausesByType);
router.get('/getUrgentCauses', getUrgentCauses);
router.get('/getStatistics', getCausesStatistics);

// Admin only routes (require authentication and admin privileges)
router.post('/createCause',  upload.single('featureImage'), handleUploadError, createDonationCause);
router.patch('/updateCause/:id', Auth, isAdmin, upload.single('featureImage'), handleUploadError, updateDonationCause);
router.delete('/deleteCause/:id', Auth, isAdmin, deleteDonationCause);
router.patch('/updateAmountCollected/:id', Auth, isAdmin, updateAmountCollected);

export default router; 