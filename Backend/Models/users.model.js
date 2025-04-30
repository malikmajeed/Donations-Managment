import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Admin ID
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true // lowercase 'unique'
  },

  // Admin First Name
  fName: {
    type: String,
    trim: true,
    required:true
  },

  // Admin Last Name
  lName: {
    type: String,
    trim: true,
    required:true
  },

  // Admin Email
  email: {
    type: String,
    required: true,
    unique: true, // lowercase 'unique'
    lowercase: true
  },
  role:{
    type:String,
    enum:["admin", "donor"],
    default:"donor"
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
  password:{
    type:String,
    required:true
  }

}, {timestamps: true});

const Users = mongoose.model('Users', userSchema);


export default Users;
