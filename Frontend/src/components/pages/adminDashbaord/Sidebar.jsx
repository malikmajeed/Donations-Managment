import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  MessageSquare,
  FileText,
  Calendar,
  Database
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', badge: null },
  { id: 'students', label: 'Students', icon: Users, href: '/students', badge: null },
  { id: 'education', label: 'Education', icon: FileText, href: '/education', badge: null },
  { id: 'empowerment', label: 'Empowerment', icon: BarChart3, href: '/empowerment', badge: null },
  { id: 'food-distribution', label: 'Food Distribution', icon: ShoppingCart, href: '/food-distribution', badge: null },
  { id: 'mobile-clinic', label: 'Mobile Clinic', icon: Calendar, href: '/mobile-clinic', badge: null },
  { id: 'water-wells', label: 'Water Wells', icon: Database, href: '/water-wells', badge: null },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', badge: null }
];

const adminUser = {
  name: 'Sarah Johnson',
  email: 'sarah@company.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
};

export default function Sidebar() {
  const handleLogout = () => {
    // Dummy logout
    alert('Logging out...');
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen shadow-xl">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-lg">AdminHub</h1>
            <p className="text-gray-500 text-xs">Management Portal</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        {/* Row 1: Profile, username, email */}
        <div className="flex items-center space-x-3 mb-2">
          <img src={adminUser.avatar} alt={adminUser.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-gray-900 leading-tight">{adminUser.name}</div>
            <div className="text-xs text-gray-500 leading-tight">{adminUser.email}</div>
          </div>
        </div>
        {/* Row 2: Settings and Logout */}
        <div className="flex items-center space-x-2 justify-end">
          <button
            className="flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            title="Settings"
          >
            <Settings className="w-4 h-4 mr-1" /> Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigationItems.map(item => (
          <NavLink
            key={item.id}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-1.5 rounded-lg transition font-medium text-sm ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`
            }
          >
            <item.icon className="w-[22px] h-[22px] mr-2" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-xs font-medium">System Status</span>
          </div>
          <p className="text-green-600 text-xs">All systems operational</p>
        </div>
      </div>
    </aside>
  );
}