import { User, CalendarDays, GraduationCap, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import WishListButton from '../../buttons/wishList';
import { SponsorButton } from '../../buttons/sponsor';

export default function StudentCard({
  profileImage,
  firstName,
  lastName,
  gender,
  age,
  profileUrl,
  studentClass,
  fee,
  sponsored,
  adminView = false,
  studentId
}) {
  // Use default avatar if profileImage is missing, null, or empty string
  let imageSrc = '/default-avatar.avif';
  if (profileImage && profileImage.trim() !== '') {
    imageSrc = profileImage.startsWith('http')
      ? profileImage
      : `http://localhost:3000/${profileImage.replace(/^\/+/, '')}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Status Badge and Icons */}
        <div className="w-full flex justify-between items-start relative">
          <span 
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              sponsored 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {sponsored ? 'Sponsored' : 'Not Sponsored'}
          </span>
          <User className="h-5 w-5 text-gray-400" />
          
          {/* Add to Cart Button */}
          <div className="absolute -top-2 -right-2 z-10">
            <WishListButton item={{
              id: studentId,
              name: `${firstName} ${lastName}`,
              featureImage: imageSrc,
              amount: fee
            }}
              
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={`${firstName} ${lastName}'s profile`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Student Info */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-blue-600">{firstName} {lastName}</h3>

        </div>
        <div className='grid grid-cols-2 gap-2'>
          <h3 className='text-lg text-gray-900'>{age} years Old</h3>
          <h3 className='text-lg text-gray-900'>${fee}/Month</h3>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          {adminView ? (
            <>
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                data-studentid={studentId}
              >
                Edit
              </button>
              <button 
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                data-studentid={studentId}
              >
                View Profile
              </button>
            </>
          ) : (
            <>
             <SponsorButton 
             item={{
              id: studentId,
              name: `${firstName} ${lastName}`,
              featureImage: imageSrc,
              amount: fee
            }} 
            text="Sponsor"/>
            
              <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                View Profile
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
} 