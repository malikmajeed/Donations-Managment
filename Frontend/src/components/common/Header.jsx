import React from 'react';
import { Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-1">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img src="/vite.svg" alt="Logo" className="w-9 h-9" />
        <span className="text-xl font-bold text-blue-600 tracking-wide">
          Ansar Foundation
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-4">
        <button className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md font-medium text-base transition-colors hover:bg-blue-600 hover:text-white">
          Login
        </button>
        <button className="border border-emerald-600 text-emerald-600 px-4 py-1.5 rounded-md font-medium text-base transition-colors hover:bg-emerald-600 hover:text-white">
          Register
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-blue-600 ml-4"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>
    </header>
  );
}
