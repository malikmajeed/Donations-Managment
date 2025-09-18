import React, { Children } from 'react'


export const PrimaryButton = ({ children, type = "button", ...props }) => {
    return (
    <button
    type={type}
    className="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-4 py-2 rounded-md shadow-md hover:from-sky-500 hover:to-sky-700 hover:shadow-lg transition-all duration-200 focus:outline-none"
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
            className="bg-sky-50 border-1 border-sky-400 text-sky-600 font-semibold px-4 py-2 rounded-md hover:bg-sky-100 hover:border-sky-600 hover:text-sky-700 transition-all duration-200 cursor-pointer focus:outline-none"
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
import { addToWishList, removeFromWishList } from '../../services/wish-list.services'
import { toast } from 'react-toastify';

export const  WishListButton =({ item })=> {
    const [isInWishlist, setIsInWishlist] = React.useState(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        return wishlist.some(wishlistItem => wishlistItem.id === item.id);
    });

    const handleClick = () => {
        if (isInWishlist) {
            removeFromWishList({ item });
            setIsInWishlist(false);
            toast.success(`${item.name || item.firstName} removed from wishlist!`);
        } else {
            addToWishList({ item });
            setIsInWishlist(true);
            toast.success(`${item.name || item.firstName} added to wishlist!`);
        }
    };

    return (
      <button 
        className={`p-2 rounded-full shadow-lg transition-all duration-200 z-0 focus:outline-none ${
          isInWishlist 
            ? 'bg-sky-500 hover:bg-sky-600 text-white' 
            : 'bg-white border border-sky-400 hover:bg-sky-50 text-sky-500 hover:text-sky-600'
        }`}
        onClick={handleClick}
      >
        <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
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
