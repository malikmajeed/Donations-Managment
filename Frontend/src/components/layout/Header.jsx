import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';
import { PrimaryButton, SecondaryButton } from '../buttons';
import AuthModal from '../modals/AuthModal';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authModal, setAuthModal] = useState({ isOpen: false, type: 'login' });

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const openAuthModal = (type) => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'login' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-blue-600">
              Ansar Foundation
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-3 py-1 rounded-md font-medium transition-all duration-200 focus:outline-none ${
                isActiveLink('/') 
                  ? 'bg-sky-50 text-sky-600' 
                  : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/causes" 
              className={`px-3 py-1 rounded-md font-medium transition-all duration-200 focus:outline-none ${
                isActiveLink('/causes') 
                  ? 'bg-sky-50 text-sky-600' 
                  : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              Causes
            </Link>
            <Link 
              to="/students" 
              className={`px-3 py-1 rounded-md font-medium transition-all duration-200 focus:outline-none ${
                isActiveLink('/students') 
                  ? 'bg-sky-50 text-sky-600' 
                  : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              Students
            </Link>
            
          </nav>

          {/* Right Side - Auth/User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-1 rounded-md font-medium transition-all duration-200 focus:outline-none ${
                    isActiveLink('/dashboard') 
                      ? 'bg-sky-50 text-sky-600' 
                      : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-md">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-all duration-200 focus:outline-none"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <PrimaryButton onClick={() => openAuthModal('login')}>
                  Login
                </PrimaryButton>
                <SecondaryButton onClick={() => openAuthModal('register')}>
                  Register
                </SecondaryButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        type={authModal.type}
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
      />
    </header>
  );
};

export default Header;
