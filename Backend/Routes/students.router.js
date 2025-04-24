import express from 'express';
const router = express.Router();


import {addStudent, deleteStudent, updateStudent} from '../Controllers/students.controller.js';



//Route for adding a student
router.post('/addStudent', addStudent);

//Route for deleting a student
router.delete('/deleteStudent/:id', deleteStudent);

//Route for updating a student
router.put('/updateStudent/:id', updateStudent);


export default router;