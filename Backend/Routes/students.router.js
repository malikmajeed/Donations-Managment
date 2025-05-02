import express from 'express';
const router = express.Router();


import {addStudent, deleteStudent, updateStudent, 
    getStudentbyId, getAllStudents,
     getStudentbySponsorship, updateSponsorship
    } from '../Controllers/students.controller.js';



//Route for adding a student
router.post('/addStudent', addStudent); //✅ verified

//Route for deleting a student
router.delete('/deleteStudent/:id', deleteStudent); //✅ verified

//Route for updating a student
router.put('/updateStudent/:id', updateStudent);//✅ verified

//Route for getting a student by id
router.get('/getStudentbyId/:id', getStudentbyId);//✅ verified

//Route for getting all students
router.get('/getAllStudents', getAllStudents);//✅ verified

//Route for getting a student by sponsorship
router.get('/getStudentbySponsorship/', getStudentbySponsorship);//✅ verified

//Route for updating a student's sponsorship
router.patch('/updateSponsorship/:id', updateSponsorship);//✅ verified



export default router;