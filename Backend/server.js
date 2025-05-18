import express from 'express'
import dotenv from 'dotenv'
const app = express();
import cors from 'cors'
import mongoose from 'mongoose';
import studentRouter from './Routes/students.router.js';
import usersRouter from './Routes/users.router.js';
import donationsRouter from './Routes/donations.routes.js'

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log('MongoDB connected successfully'))
.catch((err)=>console.log(`An Error occured While connecting to mongoDB: {err}`));


console.log('reading controllers')
app.use('/students/', studentRouter );
app.use('/users/', usersRouter );
app.use('/donations/', donationsRouter)


app.listen(process.env.PORT,()=>{
    console.log('Server is listening at : http://localhost:3000/')
})
