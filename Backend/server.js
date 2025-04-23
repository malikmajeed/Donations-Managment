import express from 'express'
const app = express();
import cors from 'cors'
import mongoose from 'mongoose';
import router from './Routes/students.router.js'



app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/DTSystem')
.then(()=>console.log('MongoDB connected successfully'))
.catch((err)=>console.log(`An Error occured While connecting to mongoDB: {err}`));



app.use('/', router );


app.listen(3000,()=>{
    console.log('Server is listening at : https://localhost:3000/')
})
