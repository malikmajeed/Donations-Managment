import express from 'express';
const router = express.Router();

import {addStudent, deleteStudent, updateStudent, 
    getStudentbyId, getAllStudents,
      updateSponsorship, updateFeeStatus, recordPayment, getFeeSummary
    } from '../Controllers/students.controller.js';

    import { authenticateToken as Auth, isAdmin } from '../Middlewares/authentication.js';
    import { upload, handleUploadError } from '../Middlewares/upload.js';
    
    //Route for adding a student
router.post('/addStudent',Auth, isAdmin,  upload.single('profileImage'), handleUploadError, addStudent); //✅ verified
    
//Route for deleting a student
router.delete('/deleteStudent/:id',Auth, isAdmin,deleteStudent); //✅ verified

//Route for updating a student
router.patch('/updateStudent/:id',Auth,isAdmin,upload.single('profileImage'), handleUploadError, updateStudent);//✅ verified

//Route for getting a student by id
router.get('/getStudentbyId/:id', getStudentbyId);//✅ verified

//Route for getting all students
router.get('/getAllStudents', getAllStudents);//✅ verified

//Route for updating a student's sponsorship
router.patch('/updateSponsorship/:id', updateSponsorship);//✅ verified

//Route for updating fee status
router.patch('/updateFeeStatus/:id', Auth, isAdmin, updateFeeStatus);//✅ verified

//Route for recording a payment
router.post('/recordPayment/:id', Auth, isAdmin, recordPayment);//✅ verified

//Route for getting fee summary
router.get('/getFeeSummary/:id', Auth, getFeeSummary);//✅ verified

export default router;