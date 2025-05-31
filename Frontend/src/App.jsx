import { useState } from 'react'
import HeroSection from './pages/Home/HeroSection.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import './App.css'
import SignIn from './components/signIn/SignIn.jsx'
import AddStudent from './components/addStudent/AddStudent.jsx'



function App() {
  
  const [form, setForm]=useState(false)

  return (
    <>

    {form?( 
     <SignUp selectForm={setForm} />  //first setForm is the name of prop your passing
    ):(         
      <SignIn selectForm={setForm}/>              //while the setForm is the actual value of it/>
    )}
     
    
      
   

  
    
    
    <AddStudent />
    </>
  )
}

export default App
