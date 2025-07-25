import React, { useEffect, useState } from 'react';
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
  Database,
  LogOut
} from 'lucide-react';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api.config.js';

const adminUser = {
  name: 'Sarah Johnson',
  email: 'sarah@company.com',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
};

export default function Sidebar() {
  const [counts, setCounts] = useState({
    students: 0,
    users: 0,
    education: 0,
    empowerment: 0,
    foodDistribution: 0,
    mobileClinic: 0,
    waterWells: 0
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        // Students
        const studentsRes = await axios.get('http://localhost:3000/student/getAllStudents');
        const studentsCount = Array.isArray(studentsRes.data) ? studentsRes.data.length : (studentsRes.data.students?.length || 0);
        // Users
        const usersRes = await axios.get(API_CONFIG.ENDPOINTS.USER.GET_ALL_USERS);
        const usersCount = Array.isArray(usersRes.data) ? usersRes.data.length : (usersRes.data.users?.length || 0);
        // Causes
        const causesRes = await axios.get('http://localhost:3000/causes/getAllCauses');
        const causes = Array.isArray(causesRes.data.causes) ? causesRes.data.causes : (Array.isArray(causesRes.data) ? causesRes.data : []);
        setCounts({
          students: studentsCount,
          users: usersCount,
          education: causes.filter(c => c.type === 'education').length,
          empowerment: causes.filter(c => c.type === 'empowerment').length,
          foodDistribution: causes.filter(c => c.type === 'foodDistribution').length,
          mobileClinic: causes.filter(c => c.type === 'mobileClinic').length,
          waterWells: causes.filter(c => c.type === 'waterWells').length
        });
      } catch (err) {
        // fallback: don't show badges if error
      }
    }
    fetchCounts();
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', badge: null },
    { id: 'students', label: 'Students', icon: Users, href: '/students', badge: counts.students },
    { id: 'users', label: 'Users', icon: Users, href: '/users', badge: counts.users },
    { id: 'education', label: 'Education', icon: FileText, href: '/education', badge: counts.education },
    { id: 'empowerment', label: 'Empowerment', icon: BarChart3, href: '/empowerment', badge: counts.empowerment },
    { id: 'food-distribution', label: 'Food Distribution', icon: ShoppingCart, href: '/food-distribution', badge: counts.foodDistribution },
    { id: 'mobile-clinic', label: 'Mobile Clinic', icon: Calendar, href: '/mobile-clinic', badge: counts.mobileClinic },
    { id: 'water-wells', label: 'Water Wells', icon: Database, href: '/water-wells', badge: counts.waterWells },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', badge: null }
  ];

  const handleLogout = () => {
    // Dummy logout
    alert('Logging out...');
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-screen shadow-xl sticky top-0 left-0 z-30">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-lg">Ansar</h1>
            <p className="text-gray-500 text-xs">Management Portal</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        {/* Row 1: Profile, username, email */}
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center space-x-3">
            <img src={adminUser.avatar} alt={adminUser.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-semibold text-gray-900 leading-tight">{adminUser.name}</div>
              <div className="text-xs text-gray-500 leading-tight">{adminUser.email}</div>
            </div>
          </div>
          {/* Row 2: Settings and Logout */}
          <div className="flex items-center space-x-2 justify-between">
            <button
              className="flex items-center px-5 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              title="Settings"
            >
              <Settings className="w-4 h-4 mr-1" /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-5 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
              title="Logout"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </button>
          </div>
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
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-blue-100'
              }`
            }
          >
            <item.icon className="w-[22px] h-[22px] mr-2" />
            <span className="flex-1">{item.label}</span>
            {item.badge > 0 && (
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