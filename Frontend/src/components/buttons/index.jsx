import React, { Children } from 'react'

export const PrimaryButton = ({ children }) => {
    return (
    <button
    className="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
    >
    {children}
    </button>
    );
    };
    
    // Secondary Button Component
    export const SecondaryButton = ({ children }) => {
    return (
    <button
    className="border-2 border-sky-400 text-sky-500 font-semibold px-6 py-2 rounded-md hover:bg-sky-50 transition"
    >
    {children}
    </button>
    );
    };