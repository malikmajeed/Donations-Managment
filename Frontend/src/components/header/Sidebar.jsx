/**
 * Sidebar with collapse/expand button, icon-only mode, and blue icons.
 */
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { ChevronLeft, ChevronRight, Home, Users, HeartHandshake, HandCoins, User, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/causes', label: 'Causes', icon: HeartHandshake },
  { to: '/donations', label: 'Donations', icon: HandCoins },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const iconColor = '#2563eb';
  const iconSize = 28;

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.header}>
          
          {!collapsed && <span className={styles.logoText}>Ansar Foundation</span>}
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed(c => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
        </div>
        <nav className={styles.navLinks}>
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={onClose}
              >
                <Icon size={iconSize} />
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            );
          })}
        </nav>
        <button className={styles.logoutBtn} style={{ background: iconColor }}>
          <LogOut size={iconSize} />
          {!collapsed && <span>Logout</span>}
        </button>
      </aside>
    </>
  );
} 