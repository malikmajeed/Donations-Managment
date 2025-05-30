import { useState } from 'react'
import HeroSection from './pages/Home/HeroSection.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import './App.css'
import SignIn from './components/signIn/SignIn.jsx'
import AddStudent from './components/addStudent/AddStudent.jsx'



function App() {
  

  return (
    <>
    <HeroSection />
    <SignIn />
    <SignUp />
    <AddStudent />
    </>
  )
}

export default App
