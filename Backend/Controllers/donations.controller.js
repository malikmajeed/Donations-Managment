import Donations from '../Models/donations.model.js';
import Students from '../Models/students.model.js';
import Users from '../Models/users.model.js';

// Add new donation
export const addDonation = async (req, res) => {
    console.log('Adding donation');
    
    try {
        const { id, donationFrom, donationTo, Amount, paymentMethod, status } = req.body;

        // Validate required fields
        if (!id || !donationFrom || !donationTo || !Amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Create new donation
        const newDonation = new Donations({
            id,
            donationFrom,
            donationTo,
            Amount,
            paymentMethod,
            status: status || "pending", // Default to pending
        });

        // Save to DB
        const savedDonation = await newDonation.save();

        return res.status(201).json({
            success: true,
            message: "Donation added successfully",
            data: savedDonation,
        });

    } catch (error) {
        console.error("Error adding donation:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while adding donation",
        });
    }
};

// Get all donations
export const getAllDonations = async (req, res) => {
    try {
        console.log('get all donations controller')
        const donations = await Donations.find();

        res.status(200).json({
            success: true,
            data: donations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donations",
            error: error.message
        });
    }
};

// Get donation by ID
export const getDonationById = async (req, res) => {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const donation = await Donations.findById(id);
        console.log(donation);
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        res.status(200).json({
            success: true,
            data: donation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donation",
            error: error.message
        });
    }
};

// Delete donation by ID
export const deleteDonation = async (req, res) => {
    try {
        const donation = await Donations.findByIdAndDelete(req.params.id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Donation deleted successfully",
            data: donation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting donation",
            error: error.message
        });
    }
};

// Update donation status
export const updateDonationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        // Validate status
        if (!status || !['pending', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be either 'pending' or 'completed'"
            });
        }

        const updatedDonation = await Donations.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).populate('donationFrom', 'name email')
         .populate('donationTo', 'name');

        if (!updatedDonation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Donation status updated successfully",
            data: updatedDonation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating donation status",
            error: error.message
        });
    }
};
