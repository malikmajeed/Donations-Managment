import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
    MdListAlt, MdSchool, MdEmojiObjects, MdFastfood, MdLocalHospital, MdOpacity, MdDashboard, MdGroup
} from 'react-icons/md';


export default function Sidebar() {
    // const [activeMenu, setActiveMenu] = useState('Dashboard');

    // const menu = [
    //     { label: 'Dashboard', icon: <MdDashboard /> },
    //     { label: 'All Causes', icon: <MdListAlt /> },
    //     { label: 'All Students', icon: <MdGroup /> },
    //     { label: 'Education', icon: <MdSchool /> },
    //     { label: 'Empowerment', icon: <MdEmojiObjects /> },
    //     { label: 'Food', icon: <MdFastfood /> },
    //     { label: 'Mobile Clinic', icon: <MdLocalHospital /> },
    //     { label: 'Water Wells', icon: <MdOpacity /> },
    // ];


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