import mongoose from "mongoose";

const donationsSchema = new mongoose.Schema({
    donationFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    donationTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    donationToType: {
        type: String,
        enum: ['student', 'cause'],
        required: true
    },
    donationToModel: {
        type: String,
        enum: ['Students', 'DonationCauses'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'bank_transfer', 'online_payment', 'check', 'other']
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "cancelled"],
        default: "pending"
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true
    },
    notes: {
        type: String,
        maxlength: 1000
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    receiptNumber: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true });

// Index for better query performance
donationsSchema.index({ donationTo: 1, donationToType: 1 });
donationsSchema.index({ donationFrom: 1 });
donationsSchema.index({ status: 1 });
donationsSchema.index({ createdAt: -1 });

// Virtual populate for the donation target
donationsSchema.virtual('target', {
    refPath: 'donationToModel',
    localField: 'donationTo',
    foreignField: '_id',
    justOne: true
});

// Pre-save middleware to generate receipt number
donationsSchema.pre('save', function(next) {
    if (!this.receiptNumber) {
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        this.receiptNumber = `RCP-${timestamp}-${random}`;
    }
    next();
});

// Static method to get donations by target
donationsSchema.statics.getDonationsByTarget = function(targetId, targetType) {
    return this.find({
        donationTo: targetId,
        donationToType: targetType,
        status: 'completed'
    }).populate('donationFrom', 'firstName lastName email');
};

// Static method to get total donations for a target
donationsSchema.statics.getTotalDonationsForTarget = function(targetId, targetType) {
    return this.aggregate([
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
                totalAmount: { $sum: '$amount' },
                totalDonations: { $sum: 1 }
            }
        }
    ]);
};

const Donations = mongoose.model('Donations', donationsSchema);

export default Donations;
