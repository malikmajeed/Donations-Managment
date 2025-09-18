import { User, CalendarDays, GraduationCap, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

// import WishListButton from '../buttons/wishList';

import * as Dialog from "@radix-ui/react-dialog";

import StudentDialog from '../models/StudentDialog';

import { SponsorButton, SecondaryButton, WishListButton } from '../buttons';

import { Sponsorship } from '../ui/Sponsorship';



export default function StudentPreviewCard({ student}) {

  const profileImage = student.profileUrl || student.profileImage;
  const firstName = student.firstName;
  const lastName = student.lastName;
  const gender = student.gender;
  const age = student.age;
  const studentClass = student.studentClass;
  const fee = student.monthlyFee || student.fee;
  const sponsored = student.sponsorship || student.sponsored;
  const studentId = student._id || student.id;
 


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
      <div className="flex flex-col items-center space-y-4 z-0">
        {/* Status Badge and Icons */}
        <div className="w-full flex justify-between items-start z-0">
          <Sponsorship sponsored={sponsored} />
        
          
          {/* Add to Cart Button */}
          <div className="z-0">
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
        <div >
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden z-0">
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
        <div className='grid grid-cols-2 gap-4 w-full'>
          <div className='flex items-center justify-center space-x-2 bg-gray-50 rounded-lg px-3 py-2'>
            <CalendarDays className='w-4 h-4 text-blue-600' />
            <span className='text-sm font-medium text-gray-700'>{age} years</span>
          </div>
          <div className='flex items-center justify-center space-x-2 bg-gray-50 rounded-lg px-3 py-2'>
            <DollarSign className='w-4 h-4 text-green-600' />
            <span className='text-sm font-medium text-gray-700'>${fee}/mo</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col space-y-2">
         
          
             <SponsorButton 
             item={{
              id: studentId,
              name: `${firstName} ${lastName}`,
              featureImage: imageSrc,
              amount: fee
            }} 
           >
            Sponsor
            </SponsorButton>
            
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <SecondaryButton>
                View Profile
              </SecondaryButton>
            </Dialog.Trigger>
            <StudentDialog student={student} />
          </Dialog.Root>
          
        

        </div>
      </div>
    </motion.div>
  );
} 