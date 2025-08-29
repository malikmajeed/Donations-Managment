import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../buttons'
const AboutImage = "images/ansar relief foundation.png";



export const HeroSection = () => {
  return (
    <div className="flex flex-col h-[600px] justify-center items-center text-center gap-6  p-8 bg-white text-gray-800 bg-yellow">
      <h1 className="text-6xl font-bold text-[#11a4ed] font-arial">Ansar Relief Foundation</h1>
      <p className="text-3xl text-gray-600">Where compassion meets action.</p>
      <p className="text-base text-gray-700 max-w-4xl text-lg">
        Together, we are building brighter futures for orphans, vulnerable children, and families in need.
      </p>

      <div className="flex gap-4 mt-6">
        <PrimaryButton>Donate Now!</PrimaryButton>
        <SecondaryButton>Know More</SecondaryButton>
      </div>
    </div>
  )
}



export const AboutSection = ()=>{

return(

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center px-10">
  {/* image side */}
  <div className="order-2 md:order-1 flex item-center justify-center">
    <img src={AboutImage} alt="Ansar School Image" className="w-[80%] h-auto" />
  </div>

  {/* text side */}
  <div className="order-1 md:order-2 gap-1">
    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">About Us</h2>
    <p className="text-gray-600 mb-6 leading-relaxed">
      Ansar Relief Foundation is a nonprofit organization dedicated to uplifting communities through
      education, healthcare, and livelihood support. Since our founding, we have remained committed to
      breaking the cycle of poverty by empowering those who need it most with opportunities, dignity, and
      hope.
    </p>
    <p className="text-gray-600 mb-8 leading-relaxed">
      Our mission is simple yet profound: to serve humanity with integrity, compassion, and impact.
    </p>
    
    <ul className="space-y-3 mb-8">
      <li className="flex items-center">
        <div className="w-5 h-5 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        </div>
        <span className="text-gray-700">Education & Food to Orphans</span>
      </li>
      <li className="flex items-center">
        <div className="w-5 h-5 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        </div>
        <span className="text-gray-700">Water wells to needy peoples</span>
      </li>
      <li className="flex items-center">
        <div className="w-5 h-5 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        </div>
        <span className="text-gray-700">Startups to jobless peoples</span>
      </li>
      <li className="flex items-center">
        <div className="w-5 h-5 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        </div>
        <span className="text-gray-700">Mobile Clinic Aid</span>
      </li>
    </ul>
    
    <div className="relative mb-10">
      <div className="absolute h-0.5 bg-blue-100 w-full top-1/2 transform -translate-y-1/2"></div>
      <div className="relative bg-white inline-block px-4">
        <span className="text-blue-600 font-semibold text-lg">10+ Years of Serving Afghanistan</span>
      </div>
    </div>
    
    <PrimaryButton className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
      Read More
    </PrimaryButton>
  </div>
</div>
)


}