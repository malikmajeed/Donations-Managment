import addStudent from '../Controllers/students.controller.js';
import express from 'express';
const router = express.Router();



//Route for adding a student
router.post('/addStudent', addStudent);



export default router;