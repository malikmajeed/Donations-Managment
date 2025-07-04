import mongoose from "mongoose";

const donationCausesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    location: {
        type: String,
        // required: true,
        trim: true,
        maxlength: 500
    },
    type: {
        type: String,
        enum: ["education", "empowerment", "foodDistribution", "mobileClinic", "waterWells"],
        required: true
    },
    featureImage: {
        type: String,
        default: null
    },
    budgetRequired: {
        type: Number,
        required: true,
        min: 0
    },
    amountCollected: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    status: {
        type: String,
        enum: ["active", "completed", "paused"],
        default: "active"
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    isUrgent: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, { timestamps: true });

// Virtual for calculating progress percentage
donationCausesSchema.virtual('progressPercentage').get(function() {
    if (this.budgetRequired === 0) return 0;
    return Math.round((this.amountCollected / this.budgetRequired) * 100);
});

// Pre-save middleware to update progress
donationCausesSchema.pre('save', function(next) {
    if (this.budgetRequired > 0) {
        this.progress = Math.round((this.amountCollected / this.budgetRequired) * 100);
    }
    next();
});

// Index for better query performance
donationCausesSchema.index({ type: 1, status: 1 });
donationCausesSchema.index({ isUrgent: 1, status: 1 });

const DonationCauses = mongoose.model('DonationCauses', donationCausesSchema);

export default DonationCauses; 