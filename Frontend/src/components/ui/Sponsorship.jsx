import React from 'react'

export const Sponsorship = ({sponsored}) => {
  return (
    <div
    className={`px-3 py-1 rounded-full text-sm font-semibold z-0 ${
      sponsored 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}
  >
    {sponsored ? 'Sponsored' : 'Seeking Sponsor'}
 
  </div>
  )
}
