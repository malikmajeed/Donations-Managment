import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { addToWishList } from '../../services/wish-list'


export default function WishListButton({ item }) {


  return (
    <button className="p-2 rounded-full shadow-lg transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white"
    onClick={() => addToWishList({ item })}
    >
      <Heart className="h-5 w-5" />
    </button>
  );
}
