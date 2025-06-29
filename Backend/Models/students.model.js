import mongoose from "mongoose";


const studentsSchema= new mongoose.Schema({
    
   
     // Admin First Name
     firstName: {
       type: String,
       trim: true,
       required:true
     },
   
     // Admin Last Name
     lastName: {
       type: String,
       trim: true
     },
   
     fatherName: {
        type: String,
        trim: true
      },
     dateOfBirth: {
        type: Date,
        required: true
     },
   
     // Admin Email
    //  email: {
    //    type: String,
    //    required: true,
    //    unique: true, // lowercase 'unique'
    //    lowercase: true
    //  },
   
    gender:{
        type:String,
        enum:["male", "female", "other"],
        required:true
    },
     // Admin Phone
     phone: {
       type: Number
     },
   
     // Profile URL
     profileUrl: {
       type: String
     },
     sponsorship:{
        type:Boolean,
        default:false
     },

     // Fee related fields
     monthlyFee: {
       type: Number,
       default: 0,
       min: 0
     },
     feeStatus: {
       type: String,
       enum: ["paid", "pending", "overdue"],
       default: "pending"
     },
     lastPaymentDate: {
       type: Date
     },
     totalPaid: {
       type: Number,
       default: 0,
       min: 0
     },
     outstandingAmount: {
       type: Number,
       default: 0,
       min: 0
     },

     // Reference to Donations model
     donations: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'Donations' 
     },
     address:{
        type:String
     },
     school:{
        type:String
     },
     studentGrade:{
      type:String
      },
     introduction:{
        type:String
     }

   
}, {timestamps: true})



const Students = mongoose.model('Students', studentsSchema);

export default Students;
