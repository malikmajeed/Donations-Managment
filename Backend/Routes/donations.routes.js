import express from 'express';
import { addDonation, getAllDonations, 
    getDonationById, deleteDonation, 
    updateDonationStatus } 
    from '../Controllers/donations.controller.js';
import { authenticateToken as Auth } from "../Middlewares/authentication.js";


const router = express.Router();

// Add new donation
router.post('/add', Auth, addDonation);//✅ verified 

// Get all donations
router.get('/', Auth, getAllDonations);//✅ verifie \d

// Get donation by ID
router.get('/:id', Auth, getDonationById);//✅ verified
 
// Delete donation by ID
router.delete('/:id', Auth, deleteDonation);//✅ verified

// Update donation status
router.patch('/:id/status', updateDonationStatus);//✅ verified

export default router;  