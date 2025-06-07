import mongoose from "mongoose";


const donationsSchema = new mongoose.Schema({
   
    donationFrom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    donationTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Students',
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending", "completed"]
    }
}, {timestamps: true})




const Donations = mongoose.model('Donations', donationsSchema);
export default Donations;
