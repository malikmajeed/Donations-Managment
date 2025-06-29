import express from 'express';
import { 
    addDonation, 
    getAllDonations, 
    getDonationById, 
    deleteDonation, 
    updateDonationStatus,
    getDonationsByTarget,
    getDonationStatistics
} from '../Controllers/donations.controller.js';
import { authenticateToken as Auth, isAdmin } from "../Middlewares/authentication.js";

const router = express.Router();

// Add new donation
router.post('/add', Auth, addDonation);

// Get all donations with filtering and pagination
router.get('/', Auth, getAllDonations);

// Get donation statistics
router.get('/statistics', Auth, getDonationStatistics);

// Get donations by target (student or cause)
router.get('/target/:targetType/:targetId', Auth, getDonationsByTarget);

// Get donation by ID
router.get('/:id', Auth, getDonationById);

// Update donation status
router.patch('/:id/status', Auth, isAdmin, updateDonationStatus);

// Delete donation by ID (Admin only)
router.delete('/:id', Auth, isAdmin, deleteDonation);

export default router;  