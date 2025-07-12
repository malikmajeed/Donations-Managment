import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
    MdListAlt, MdSchool, MdEmojiObjects, MdFastfood, MdLocalHospital, MdOpacity, MdDashboard, MdGroup
} from 'react-icons/md';


export default function Sidebar() {



    return (
        <>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Admin</span>
                </div>
                <nav className={styles.menu}>

                    <NavLink to="/dashboard" end className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}>
                        <MdDashboard /> <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/students" className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}>
                        <MdGroup /> <span>Students</span>
                    </NavLink>
                    <NavLink to="/education" className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}>
                        <MdSchool /> <span>Education</span>
                    </NavLink>

                </nav>
            </aside></>
    )
}