import React, { Children } from 'react'


export const PrimaryButton = ({ children, type = "button", ...props }) => {
    return (
    <button
    type={type}
    className="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
    {...props}
    >
        {children}
    </button>
    );
    };
    
    // Secondary Button Component
    export const SecondaryButton = ({ children, type = "button", ...props }) => {
    return (
        <button
            type={type}
            className="border-2 border-sky-400 text-sky-500 font-semibolds px-4 py-2 rounded-md hover:bg-sky-50 transition cursor-pointer"
            {...props}
        >
            {children}
        </button>
    );
};



import { addToCart } from '../../services/cart.services';

export const SponsorButton = ({ children, type = "button", item, ...props }) => {
    const handleClick = () => {

        addToCart({ item });
       

    };

    return (
        <button
          type={type}
          onClick={handleClick}
           className="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
            {...props}
        >
            {children}
        </button>
    );
};





import { Heart } from 'lucide-react';
import { addToWishList } from '../../services/wish-list.services'

export const  WishListButton =({ item })=> {

    const handleClick = () => {
        addToWishList({ item });
      
    };

    return (
      <button className="p-2 rounded-full shadow-lg transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white z-0 "
      onClick={handleClick}
      >
        <Heart className="h-5 w-5" />
      </button>
    );
  }
  





  // components/GoogleButton.jsx

import { FcGoogle } from "react-icons/fc";

export function GoogleButton({
  children = "Continue with Google",
  onClick,
  loading = false,
  className = "",
  ...rest
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`w-full inline-flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      <FcGoogle className="h-5 w-5" />
      <span>{loading ? "Connecting..." : children}</span>
    </button>
  );
}
