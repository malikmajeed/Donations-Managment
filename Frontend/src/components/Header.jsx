import React from 'react';
import styles from './Header.module.css';
import { Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <img src="/vite.svg" alt="Logo" className={styles.logo} />
        <span className={styles.brand}>Ansar Foundation</span>
      </div>
      <nav className={styles.navSection}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.registerBtn}>Register</button>
      </nav>
      <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open menu">
        <Menu size={28} />
      </button>
    </header>
  );
} 