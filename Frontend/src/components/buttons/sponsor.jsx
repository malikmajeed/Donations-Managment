import React from 'react'
import { addToCart } from '../../services/cart'

export const SponsorButton = ({item, text}) => {
  return (
  
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200" 
          onClick={() => addToCart({item})}>
                {text}
            </button>
   
  )
}
