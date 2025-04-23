import mongoose from "mongoose";


const studentsSchema= new mongoose.Schema({
    
   id: {
       type: Number,
       required: true,
       unique: true // lowercase 'unique'
     },
   
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
     studentGrade:String,
     // Created At
     createdAt: {
       type: Date,
       default: Date.now
     }
   
})



const Students = mongoose.model('Students', studentsSchema);

export default Students;
