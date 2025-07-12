import React, { useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import styles from './AdminDashboard.module.css';
import Dashboard from './Dashboard';
import AllStudents from './AllStudents'; // (to be created)
import Education from './Education';



const profile = {
  name: 'Admin User',
  image: 'https://randomuser.me/api/portraits/men/32.jpg'
};

export default function AdminDashboard() {


  return (
    <div className={styles.adminDashboardWrapper}>
      <Sidebar />
      <div className={styles.mainContent}>
        {/* Header Bar */}
        <div className={styles.headerBar}>
          <div className={styles.profile}>
            <img src={profile.image} alt="Profile" className={styles.profileImg} />
            <span className={styles.profileName}>{profile.name}</span>
          </div>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
        {/* Dashboard Content */}
     

        
          {/* SiderBard */}
          {/* Main Components */}

          <Routes>
            <Route path='dashboard' element={<Dashboard />}></Route>
            {/* <Route path='AllCauses' element={<AllCauses />}></Route> */}
            <Route path='students' element={<AllStudents />}></Route>
            <Route path='education' element={<Education />}></Route>
            {/* <Route path='Empowerment' element={<Empowerment />}></Route>
            <Route path='Food-Distribution' element={<FoodDistribution />}></Route>
            <Route path='Modile-Clinic' element={<ModileClinic />}></Route>
            <Route path='Water-wells' element={<WaterWells />}></Route> */}
          </Routes>
        
      </div>
    </div>
  );
} 