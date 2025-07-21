import React, { useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AllStudents from './AllStudents'; // (to be created)
import Education from './Education';
import Empowerment from './Empowerment';
import FoodDistribution from './FoodDistribution';
import MobileClinic from './MobileClinic';
import WaterWells from './WaterWells';

const profile = {
  name: 'Admin User',
  image: 'https://randomuser.me/api/portraits/men/32.jpg'
};

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-1 mr-1">
        {/* Main Content Area with Padding */}
        <div className="p-4">
          <Routes>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='students' element={<AllStudents CauseType="students"/>} />
            <Route path='education' element={<Education CauseType="education"/>} />
            <Route path='empowerment' element={<Empowerment CauseType="empowerment"/>} />
            <Route path='food-distribution' element={<FoodDistribution CauseType="foodDistribution" />} />
            <Route path='mobile-clinic' element={<MobileClinic CauseType="mobileClinic"/>} />
            <Route path='water-wells' element={<WaterWells CauseType="waterWells"/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
} 