import mongoose from "mongoose";
import Students from "../Models/students.model.js";


// Adding a new Student
const addStudent = async (req, res) => {
  console.log('Adding a new student');
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  console.log('Request files:', req.files);
  console.log('Request headers:', req.headers);
  
    try {
      const {
        firstName,
        lastName,
        fatherName,
        dateOfBirth,
        gender,
        phone,
        address,
        school,
        studentGrade,
        introduction
      } = req.body;

      // Get the uploaded file path if exists
      const profileUrl = req.file ? `/uploads/students/${req.file.filename}` : '';
      console.log('Profile URL:', profileUrl);
      console.log('File details:', req.file ? {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : 'No file uploaded');
  
      // Check required fields
      if (!firstName || !fatherName || !gender || !dateOfBirth) {
        return res.status(406).json({
          success: false,
          message: "Required fields are missing",
          missingFields: {
            firstName: !firstName,
            fatherName: !fatherName,
            gender: !gender,
            dateOfBirth: !dateOfBirth
          }
        });
      }
  
      // Check if the student already exists
      const isStudent = await Students.findOne({
        firstName,
        lastName,
        fatherName
      });
  
      if (isStudent) {
        return res.status(403).json({
          success: false,
          message: 'Student already exists'
        });
      }
  
      // Create and save new student
      const newStudent = new Students({
        firstName,
        lastName,
        fatherName,
        dateOfBirth,
        gender,
        phone,
        profileUrl,
        address,
        school,
        studentGrade,
        introduction
      });
  
      await newStudent.save();
      console.log('Student saved successfully:', newStudent);
      return res.status(201).json({
        success: true,
        message: 'New Student added successfully',
        student: newStudent
      });
    } catch (error) {
      console.error('Error occurred while creating student:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error while adding student',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };
  
// delete student. 
const deleteStudent = async (req, res) => {
  console.log('Deleting a student');
  try {
    const { id } = req.params;
    if (!id) {
      console.log('Error while fetching student Id from params');
      return res.status(400).send('Student ID is required');
    }
    
    const isDeletedStudent = await Students.findByIdAndDelete(id);
    if (isDeletedStudent) {
      console.log('Student deleted successfully');
      return res.status(200).send('Student Deleted Successfully');
    } else {
      console.log('Student not found');
      return res.status(404).send("Student doesn't exist");
    }
  } catch (error) {
    console.error('An Error occurred while deleting student: ', error.message);
    return res.status(500).send('Server Error while deleting the student');
  }
};

//updating student data
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      firstName, 
      lastName, 
      fatherName, 
      dateOfBirth,
      gender, 
      phone, 
      profileUrl, 
      address, 
      school, 
      studentGrade, 
      introduction 
    } = req.body;

    if (!id) {
      console.log('Error while fetching student Id from params');
      return res.status(400).send('Student ID is required');
    }

    const isUpdatedStudent = await Students.findByIdAndUpdate(id, {
      firstName, 
      lastName, 
      fatherName, 
      dateOfBirth,
      gender, 
      phone, 
      profileUrl, 
      address, 
      school, 
      studentGrade, 
      introduction
    }, {runValidators:true}, {new:true});

    if(!isUpdatedStudent){
      return res.status(404).send('Student not found');
    }
    return res.status(200).send('Student updated successfully');
  } catch (error) {
    console.error('An Error occurred while updating student: ', error.message);
    return res.status(500).send('Server Error while updating the student');
  }
}; 

//get student by id
const getStudentbyId = async (req, res) => {
    try{  
        const {id} = req.params;
        if(!id){
            console.log('Error while fetching student Id from params');
            return res.status(400).send('Student ID is required');
        }
        const student = await Students.findById(id);
        if(!student){
            return res.status(404).send('Student not found');
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error('An Error occurred while fetching student: ', error.message);
        return res.status(500).send('Server Error while fetching the student');
    }1
}

//get all students
const getAllStudents = async (req, res) => {
    try{

        const students = await Students.find();
        return res.status(200).json(students);
    } catch (error) {
        console.error('An Error occurred while fetching all students: ', error.message);
        return res.status(500).send('Server Error while fetching all students');
    }
}
    



const updateSponsorship = async (req, res) => {
    try{
        const {id} = req.params;
        const {sponsorship} = req.body;
        if(!id){
            console.log('Error while fetching student Id from params');
            return res.status(400).send('Student ID is required');
        }
        const isUpdatedStudent = await Students.findByIdAndUpdate(id, {sponsorship}); 
        if(!isUpdatedStudent){
            return res.status(404).send('Student not found');
        }
        return res.status(200).send('Sponsorship updated successfully');
    } catch (error) {
        console.error('An Error occurred while updating sponsorship: ', error.message);
        return res.status(500).send('Server Error while updating sponsorship');
    }
} 






export {addStudent, deleteStudent, 
  updateStudent, getStudentbyId, 
  updateSponsorship, 
  getAllStudents};