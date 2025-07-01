import mongoose from "mongoose";
import Donations from '../Models/donations.model.js';
import Students from '../Models/students.model.js';
import DonationCauses from '../Models/donationCauses.model.js';

// Add new donation
export const addDonation = async (req, res) => {
    try {
        const { 
            donationTo, 
            donationToType, 
            amount, 
            paymentMethod, 
            notes, 
            isAnonymous,
            transactionId 
        } = req.body;

        const donationFrom = req.user.id; // Get from authenticated user

        // Validate required fields
        if (!donationTo || !donationToType || !amount || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
                missingFields: {
                    donationTo: !donationTo,
                    donationToType: !donationToType,
                    amount: !amount,
                    paymentMethod: !paymentMethod
                }
            });
        }

        // Validate donation target exists
        let targetExists = false;
        let donationToModel = '';

        if (donationToType === 'student') {
            const student = await Students.findById(donationTo);
            if (student) {
                targetExists = true;
                donationToModel = 'Students';
            }
        } else if (donationToType === 'cause') {
            const cause = await DonationCauses.findById(donationTo);
            if (cause) {
                targetExists = true;
                donationToModel = 'DonationCauses';
            }
        }

        if (!targetExists) {
            return res.status(404).json({
                success: false,
                message: `${donationToType} not found`
            });
        }

        // Create new donation
        const newDonation = new Donations({
            donationFrom,
            donationTo,
            donationToType,
            donationToModel,
            amount: parseFloat(amount),
            paymentMethod,
            notes,
            isAnonymous: isAnonymous || false,
            transactionId,
            status: "pending"
        });

        const savedDonation = await newDonation.save();

        // Populate the donation with user and target information
        await savedDonation.populate('donationFrom', 'firstName lastName email');
        await savedDonation.populate('target');

        return res.status(201).json({
            success: true,
            message: "Donation added successfully",
            donation: savedDonation
        });

    } catch (error) {
        console.error("Error adding donation:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding donation",
            error: error.message
        });
    }
};

// Get all donations with filtering and pagination
export const getAllDonations = async (req, res) => {
    try {
        const user = req.user;
        const {
            page = 1,
            limit = 10,
            status,
            donationToType,
            startDate,
            endDate,
            minAmount,
            maxAmount
        } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Build filter object
        const filter = {};
        
        // If user is not admin, only show their donations
        if (user.role !== 'admin') {
            filter.donationFrom = user.id;
        }
        
        if (status) filter.status = status;
        if (donationToType) filter.donationToType = donationToType;
        if (minAmount || maxAmount) {
            filter.amount = {};
            if (minAmount) filter.amount.$gte = parseFloat(minAmount);
            if (maxAmount) filter.amount.$lte = parseFloat(maxAmount);
        }
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const donations = await Donations.find(filter)
            .populate('donationFrom', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Manually populate the target based on donationToType
        const processedDonations = await Promise.all(donations.map(async (donation) => {
            const donationObj = donation.toObject();
            
            try {
                if (donationObj.donationToType === 'student') {
                    const student = await Students.findById(donationObj.donationTo).select('firstName lastName');
                    if (student) {
                        donationObj.target = {
                            firstName: student.firstName,
                            lastName: student.lastName
                        };
                    } else {
                        donationObj.target = { firstName: 'Unknown', lastName: 'Student' };
                    }
                } else if (donationObj.donationToType === 'cause') {
                    const cause = await DonationCauses.findById(donationObj.donationTo).select('name');
                    if (cause) {
                        donationObj.target = { name: cause.name };
                    } else {
                        donationObj.target = { name: 'Unknown Cause' };
                    }
                }
            } catch (error) {
                console.error('Error populating target:', error);
                donationObj.target = { firstName: 'Unknown', lastName: 'Recipient' };
            }
            
            return donationObj;
        }));

        const totalDonations = await Donations.countDocuments(filter);
        const totalPages = Math.ceil(totalDonations / parseInt(limit));

        return res.status(200).json({
            success: true,
            donations: processedDonations,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalDonations,
                hasNextPage: parseInt(page) < totalPages,
                hasPrevPage: parseInt(page) > 1
            }
        });

    } catch (error) {
        console.error("Error fetching donations:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching donations",
            error: error.message
        });
    }
};

// Get donation by ID
export const getDonationById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid donation ID"
            });
        }

        const donation = await Donations.findById(id)
            .populate('donationFrom', 'firstName lastName email')
            .populate('target');

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Check if user has permission to view this donation
        if (user.role !== 'admin' && donation.donationFrom.toString() !== user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this donation"
            });
        }

        return res.status(200).json({
            success: true,
            donation
        });

    } catch (error) {
        console.error("Error fetching donation:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching donation",
            error: error.message
        });
    }
};

// Get donations by target (student or cause)
export const getDonationsByTarget = async (req, res) => {
    try {
        const { targetId, targetType } = req.params;
        const { page = 1, limit = 10 } = req.query;

        if (!mongoose.Types.ObjectId.isValid(targetId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid target ID"
            });
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const donations = await Donations.find({
            donationTo: targetId,
            donationToType: targetType,
            status: 'completed'
        })
        .populate('donationFrom', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

        const totalDonations = await Donations.countDocuments({
            donationTo: targetId,
            donationToType: targetType,
            status: 'completed'
        });

        const totalAmount = await Donations.aggregate([
            {
                $match: {
                    donationTo: mongoose.Types.ObjectId(targetId),
                    donationToType: targetType,
                    status: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            donations,
            summary: {
                totalDonations,
                totalAmount: totalAmount[0]?.total || 0
            },
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalDonations / parseInt(limit)),
                hasNextPage: parseInt(page) < Math.ceil(totalDonations / parseInt(limit)),
                hasPrevPage: parseInt(page) > 1
            }
        });

    } catch (error) {
        console.error("Error fetching donations by target:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching donations by target",
            error: error.message
        });
    }
};

// Update donation status
export const updateDonationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid donation ID"
            });
        }

        // Validate status
        if (!status || !['pending', 'completed', 'failed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const donation = await Donations.findById(id);
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        // Update status
        donation.status = status;
        await donation.save();

        // If status is completed, update the target's amount collected
        if (status === 'completed' && donation.status !== 'completed') {
            if (donation.donationToType === 'cause') {
                const cause = await DonationCauses.findById(donation.donationTo);
                if (cause) {
                    cause.amountCollected += donation.amount;
                    if (cause.amountCollected >= cause.budgetRequired && cause.status === 'active') {
                        cause.status = 'completed';
                    }
                    await cause.save();
                }
            }
        }

        return res.status(200).json({
            success: true,
            message: "Donation status updated successfully",
            donation
        });

    } catch (error) {
        console.error("Error updating donation status:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating donation status",
            error: error.message
        });
    }
};

// Delete donation by ID (Admin only)
export const deleteDonation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid donation ID"
            });
        }

        const donation = await Donations.findByIdAndDelete(id);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Donation deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting donation:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting donation",
            error: error.message
        });
    }
};

// Get donation statistics
export const getDonationStatistics = async (req, res) => {
    try {
        const user = req.user;
        const filter = user.role !== 'admin' ? { donationFrom: user.id } : {};

        const totalDonations = await Donations.countDocuments(filter);
        const completedDonations = await Donations.countDocuments({ ...filter, status: 'completed' });
        const pendingDonations = await Donations.countDocuments({ ...filter, status: 'pending' });

        const totalAmount = await Donations.aggregate([
            { $match: { ...filter, status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const donationsByType = await Donations.aggregate([
            { $match: { ...filter, status: 'completed' } },
            { $group: { _id: '$donationToType', count: { $sum: 1 }, total: { $sum: '$amount' } } }
        ]);

        const monthlyDonations = await Donations.aggregate([
            { $match: { ...filter, status: 'completed' } },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);

        return res.status(200).json({
            success: true,
            statistics: {
                totalDonations,
                completedDonations,
                pendingDonations,
                totalAmount: totalAmount[0]?.total || 0,
                donationsByType,
                monthlyDonations
            }
        });

    } catch (error) {
        console.error("Error fetching donation statistics:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching donation statistics",
            error: error.message
        });
    }
};

