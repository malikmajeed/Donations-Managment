import mongoose from "mongoose";
import DonationCauses from "../Models/donationCauses.model.js";

// Create a new donation cause
const createDonationCause = async (req, res) => {
    try {
        const {
            name,
            location,
            type,
            budgetRequired,
            description,
            endDate,
            isUrgent
        } = req.body;

        // Get the uploaded file path if exists
        const featureImage = req.file ? `/uploads/causes/${req.file.filename}` : null;

        // Validate required fields
        if (!name || !location || !type || !budgetRequired) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing",
                missingFields: {
                    name: !name,
                    location: !location,
                    type: !type,
                    budgetRequired: !budgetRequired
                }
            });
        }

        // Check if cause with same name already exists
        const existingCause = await DonationCauses.findOne({ name });
        if (existingCause) {
            return res.status(409).json({
                success: false,
                message: 'A cause with this name already exists'
            });
        }

        // Create new donation cause
        const newCause = new DonationCauses({
            name,
            location,
            type,
            featureImage,
            budgetRequired: parseFloat(budgetRequired),
            description,
            endDate: endDate || null,
            isUrgent: isUrgent || false
        });

        await newCause.save();

        return res.status(201).json({
            success: true,
            message: 'Donation cause created successfully',
            cause: newCause
        });

    } catch (error) {
        console.error('Error creating donation cause:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while creating donation cause',
            error: error.message
        });
    }
};

// Get all donation causes with filtering and pagination
const getAllDonationCauses = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            type,
            status,
            isUrgent,
            search
        } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Build filter object
        const filter = {};
        
        if (type) filter.type = type;
        if (status) filter.status = status;
        if (isUrgent !== undefined) filter.isUrgent = isUrgent === 'true';
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const causes = await DonationCauses.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const totalCauses = await DonationCauses.countDocuments(filter);
        const totalPages = Math.ceil(totalCauses / parseInt(limit));

        return res.status(200).json({
            success: true,
            causes,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalCauses,
                hasNextPage: parseInt(page) < totalPages,
                hasPrevPage: parseInt(page) > 1
            }
        });

    } catch (error) {
        console.error('Error fetching donation causes:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching donation causes',
            error: error.message
        });
    }
};

// Get donation cause by ID
const getDonationCauseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cause ID'
            });
        }

        const cause = await DonationCauses.findById(id);
        
        if (!cause) {
            return res.status(404).json({
                success: false,
                message: 'Donation cause not found'
            });
        }

        return res.status(200).json({
            success: true,
            cause
        });

    } catch (error) {
        console.error('Error fetching donation cause:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching donation cause',
            error: error.message
        });
    }
};

// Update donation cause
const updateDonationCause = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            location,
            type,
            budgetRequired,
            description,
            status,
            endDate,
            isUrgent
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cause ID'
            });
        }

        // Get the uploaded file path if exists
        const featureImage = req.file ? `/uploads/causes/${req.file.filename}` : undefined;

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (location !== undefined) updateData.location = location;
        if (type !== undefined) updateData.type = type;
        if (budgetRequired !== undefined) updateData.budgetRequired = parseFloat(budgetRequired);
        if (description !== undefined) updateData.description = description;
        if (status !== undefined) updateData.status = status;
        if (endDate !== undefined) updateData.endDate = endDate;
        if (isUrgent !== undefined) updateData.isUrgent = isUrgent;
        if (featureImage !== undefined) updateData.featureImage = featureImage;

        const updatedCause = await DonationCauses.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCause) {
            return res.status(404).json({
                success: false,
                message: 'Donation cause not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Donation cause updated successfully',
            cause: updatedCause
        });

    } catch (error) {
        console.error('Error updating donation cause:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while updating donation cause',
            error: error.message
        });
    }
};

// Delete donation cause
const deleteDonationCause = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cause ID'
            });
        }

        const deletedCause = await DonationCauses.findByIdAndDelete(id);

        if (!deletedCause) {
            return res.status(404).json({
                success: false,
                message: 'Donation cause not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Donation cause deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting donation cause:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting donation cause',
            error: error.message
        });
    }
};

// Update amount collected for a cause
const updateAmountCollected = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cause ID'
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid amount is required'
            });
        }

        const cause = await DonationCauses.findById(id);
        if (!cause) {
            return res.status(404).json({
                success: false,
                message: 'Donation cause not found'
            });
        }

        // Update amount collected
        cause.amountCollected += parseFloat(amount);
        
        // Update status if goal is reached
        if (cause.amountCollected >= cause.budgetRequired && cause.status === 'active') {
            cause.status = 'completed';
        }

        await cause.save();

        return res.status(200).json({
            success: true,
            message: 'Amount collected updated successfully',
            cause
        });

    } catch (error) {
        console.error('Error updating amount collected:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while updating amount collected',
            error: error.message
        });
    }
};

// Get causes by type
const getCausesByType = async (req, res) => {
    try {
        const { type } = req.params;
        const { status = 'active' } = req.query;

        const filter = { type, status };
        const causes = await DonationCauses.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            causes
        });

    } catch (error) {
        console.error('Error fetching causes by type:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching causes by type',
            error: error.message
        });
    }
};

// Get urgent causes
const getUrgentCauses = async (req, res) => {
    try {
        const urgentCauses = await DonationCauses.find({
            isUrgent: true,
            status: 'active'
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            causes: urgentCauses
        });

    } catch (error) {
        console.error('Error fetching urgent causes:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching urgent causes',
            error: error.message
        });
    }
};

// Get causes statistics
const getCausesStatistics = async (req, res) => {
    try {
        const totalCauses = await DonationCauses.countDocuments();
        const activeCauses = await DonationCauses.countDocuments({ status: 'active' });
        const completedCauses = await DonationCauses.countDocuments({ status: 'completed' });
        const urgentCauses = await DonationCauses.countDocuments({ isUrgent: true, status: 'active' });

        const totalBudgetRequired = await DonationCauses.aggregate([
            { $group: { _id: null, total: { $sum: '$budgetRequired' } } }
        ]);

        const totalAmountCollected = await DonationCauses.aggregate([
            { $group: { _id: null, total: { $sum: '$amountCollected' } } }
        ]);

        const causesByType = await DonationCauses.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        return res.status(200).json({
            success: true,
            statistics: {
                totalCauses,
                activeCauses,
                completedCauses,
                urgentCauses,
                totalBudgetRequired: totalBudgetRequired[0]?.total || 0,
                totalAmountCollected: totalAmountCollected[0]?.total || 0,
                causesByType
            }
        });

    } catch (error) {
        console.error('Error fetching causes statistics:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching causes statistics',
            error: error.message
        });
    }
};

export {
    createDonationCause,
    getAllDonationCauses,
    getDonationCauseById,
    updateDonationCause,
    deleteDonationCause,
    updateAmountCollected,
    getCausesByType,
    getUrgentCauses,
    getCausesStatistics
}; 