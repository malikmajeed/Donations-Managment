import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import Dashboard from './Dashboard';
import {
  MdAttachMoney, MdFavorite, MdPeople, MdListAlt, MdSchool, MdEmojiObjects, MdFastfood, MdLocalHospital, MdOpacity, MdDashboard, MdGroup
} from 'react-icons/md';

const menu = [
  { label: 'Dashboard', icon: <MdDashboard /> },
  { label: 'All Causes', icon: <MdListAlt /> },
  { label: 'Students', icon: <MdGroup /> },
  { label: 'Education', icon: <MdSchool /> },
  { label: 'Empowerment', icon: <MdEmojiObjects /> },
  { label: 'Food', icon: <MdFastfood /> },
  { label: 'Mobile Clinic', icon: <MdLocalHospital /> },
  { label: 'Water Wells', icon: <MdOpacity /> },
];

const profile = {
  name: 'Admin User',
  image: 'https://randomuser.me/api/portraits/men/32.jpg'
};

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div className={styles.adminDashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Admin</span>
        </div>
        <nav className={styles.menu}>
          {menu.map(item => (
            <div
              key={item.label}
              className={
                activeMenu === item.label
                  ? `${styles.menuItem} ${styles.menuItemActive}`
                  : styles.menuItem
              }
              onClick={() => setActiveMenu(item.label)}
              style={{ cursor: 'pointer' }}
            >
              <span className={
                activeMenu === item.label
                  ? `${styles.menuIcon} ${styles.menuItemActive}`
                  : styles.menuIcon
              }>
                {item.icon}
              </span>
              <span className={styles.menuLabel}>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
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
        {activeMenu === 'Dashboard' && <Dashboard />}
        {/* Add other components for other menu items here as needed */}
      </div>
    </div>
  );
} 