import mongoose from "mongoose";
import Students from "../Models/students.model.js";


// Adding a new Student
const addStudent = async (req, res) => {
    try {
      const {
        id,
        firstName,
        lastName,
        fatherName,
        gender,
        phone,
        profileUrl,
        address,
        school,
        studentGrade
      } = req.body;
  
      // Check required fields
      if (!firstName || !fatherName || !gender) {
        return res.status(406).send("Required fields are missing");
      }
  
      // Check if the student already exists
      const isStudent = await Students.findOne({
        firstName,
        lastName,
        fatherName
      });
  
      if (isStudent) {
        return res.status(403).send('Student already exists');
      }
  
      // Create and save new student
      const newStudent = new Students({
        id,
        firstName,
        lastName,
        fatherName,
        gender,
        phone,
        profileUrl,
        address,
        school,
        studentGrade
      });
  
      await newStudent.save();
      return res.status(201).send('New Student added successfully');
    } catch (error) {
      console.error('Error occurred while creating student:', error.message);
      return res.status(500).send('Server error while adding student');
    }
  };
  





  export default addStudent;