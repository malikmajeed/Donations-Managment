import { useState } from 'react'
import HeroSection from './pages/Home/HeroSection.jsx'
import SignUp from './components/signUp'
import './App.css'
import SignIn from './components/signIn'
import AddStudent from './components/addStudent'
import GetStudentByID from './components/getStudent'
import GetAllStudents from './components/getAllStudents'
import UpdateAndDeleteStudent from './components/updateStudent'
import UserDashboard from './components/userDashboard/index.jsx'

function App() {
  
  const [form, setForm]=useState(false)

  return (
    <>
 
    {form?( 
     <SignUp selectForm={setForm} />  //first setForm is the name of prop your passing
    ):(         
      <SignIn selectForm={setForm}/>              //while the setForm is the actual value of it/>
    )}
     
    
      <GetAllStudents />
      <GetStudentByID studentId="6842cacb05709a76c110f023" />
    <UpdateAndDeleteStudent studentId="6842cacb05709a76c110f023"  />

  
    
    
    <AddStudent />
    <UserDashboard />
    </>
  )
}

export default App
