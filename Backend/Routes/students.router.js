import express from 'express';
const router = express.Router();


import {addStudent, deleteStudent, updateStudent, 
    getStudentbyId, getAllStudents,
     getStudentbySponsorship, updateSponsorship
    } from '../Controllers/students.controller.js';



//Route for adding a student
router.post('/addStudent', addStudent);

//Route for deleting a student
router.delete('/deleteStudent/:id', deleteStudent);

//Route for updating a student
router.put('/updateStudent/:id', updateStudent);

//Route for getting a student by id
router.get('/getStudentbyId/:id', getStudentbyId);

//Route for getting all students
router.get('/getAllStudents', getAllStudents);

//Route for getting a student by sponsorship
router.get('/getStudentbySponsorship/:sponsorship', getStudentbySponsorship);

//Route for updating a student's sponsorship
router.put('/updateSponsorship/:id', updateSponsorship);



export default router;