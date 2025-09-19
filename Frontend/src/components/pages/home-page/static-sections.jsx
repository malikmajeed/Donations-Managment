import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../buttons'
import { Heart, Shield, Users, Target } from 'lucide-react'
import { useAllCauses } from '../../../hooks/useCauses'
import CauseCard from '../../causes/CauseCard'
const AboutImage = "images/ansar relief foundation.png";



export const HeroSection = () => {
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center text-center gap-6  p-8 bg-white text-gray-800 bg-yellow">
      <h1 className="text-6xl font-bold text-[#11a4ed] font-arial">Ansar Relief Foundation</h1>
      <p className="text-3xl text-gray-600">Where compassion meets action.</p>
      <p className="text-base text-gray-700 max-w-4xl text-lg">
        Together, we are building brighter futures for orphans, vulnerable children, and families in need.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
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



export const OurVision = ()=>{
  return(
    <div className='flex flex-col h-[300px] items-center justify-center my-10 w-full bg-[#040e41] '>
      <h2 className='text-3xl md:text-5xl font-extrabold text-white mb-6'>Our Vision</h2>
      <p className='text-gray-300 mb-6 text-lg'>To create a world where every child has access to quality education, every family has the means to live with dignity, and every community has the tools to thrive.</p>
    </div>

  );
}

export const CoreValues = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Compassionate Service",
      description: "Built on principles of care, integrity, and accountability."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Service with Integrity",
      description: "Guided by honesty, compassion, and responsibility."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Human-Centered Service",
      description: "Focused on compassion, truthfulness, and accountability."
    },
    {
      icon: <Target className="w-8 h-8 text-orange-600" />,
      title: "Values-Driven Service",
      description: "Rooted in compassion, responsibility, and integrity."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Core Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeaturedCauses = () => {
  const { data: response, isLoading, isError, error } = useAllCauses();

  // Sort causes by most recent (createdAt) and display all available causes
  const causes = response?.success ? 
    response.causes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : 
    [];

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Causes
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Causes
          </h2>
          <div className="text-center text-gray-600">
            <p>Unable to load causes at this time.</p>
            <p className="text-sm text-red-500 mt-2">{error?.message}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Causes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause) => (
            <CauseCard key={cause._id} cause={cause} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <PrimaryButton className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300">
            View All Causes
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};