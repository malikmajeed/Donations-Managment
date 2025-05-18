import express from 'express';
import { addDonation, getAllDonations, 
    getDonationById, deleteDonation, 
    updateDonationStatus } 
    from '../Controllers/donations.controller.js';


const router = express.Router();

// Add new donation
router.post('/add', addDonation);//✅ verified 

// Get all donations
router.get('/', getAllDonations);//✅ verifie \d

// Get donation by ID
router.get('/:id', getDonationById);//✅ verified
 
// Delete donation by ID
router.delete('/:id', deleteDonation);//✅ verified

// Update donation status
router.patch('/:id/status', updateDonationStatus);//✅ verified

export default router;  