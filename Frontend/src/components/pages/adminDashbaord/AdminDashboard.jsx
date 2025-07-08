import React from 'react';
import styles from './AdminDashboard.module.css';
import {
  MdAttachMoney, MdFavorite, MdPeople, MdListAlt, MdSchool, MdEmojiObjects, MdFastfood, MdLocalHospital, MdOpacity, MdDashboard, MdGroup
} from 'react-icons/md';

const stats = [
  { label: 'Total Donations', value: '$12,500', icon: <MdAttachMoney />, color: styles.cardGreen },
  { label: 'Active Causes', value: '8', icon: <MdListAlt />, color: styles.cardBlue },
  { label: 'Students Sponsored', value: '24', icon: <MdPeople />, color: styles.cardPurple },
  { label: 'Users', value: '120', icon: <MdFavorite />, color: styles.cardPink }
];

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
  return (
    <div className={styles.adminDashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Admin</span>
        </div>
        <nav className={styles.menu}>
          {menu.map(item => (
            <div key={item.label} className={styles.menuItem}>
              <span className={styles.menuIcon}>{item.icon}</span>
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
        <div className={styles.dashboardContainer}>
          <header className={styles.header}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.subtitle}>Overview of platform activity and statistics</p>
          </header>
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={stat.label} className={`${styles.statCard} ${stat.color}`}>
                <div className={styles.icon}>{stat.icon}</div>
                <div className={styles.statInfo}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Add more dashboard sections here as needed */}
        </div>
      </div>
    </div>
  );
} 