import React from 'react';
import styles from './Sidebar.module.css';
import { X, Home, Users, HeartHandshake, HandCoins, User, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { to: '/students', label: 'Students', icon: <Users size={20} /> },
  { to: '/causes', label: 'Causes', icon: <HeartHandshake size={20} /> },
  { to: '/donations', label: 'Donations', icon: <HandCoins size={20} /> },
  { to: '/profile', label: 'Profile', icon: <User size={20} /> },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span className={styles.logoText}>Ansar Foundation</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <nav className={styles.navLinks}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={onClose}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
} 