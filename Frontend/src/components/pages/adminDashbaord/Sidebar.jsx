import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
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

                    <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>
                    <MdDashboard />  Dashboard
                    </NavLink>
                    <NavLink to="/students" className={({ isActive }) => isActive ? 'active' : ''}>
                        Students
                    </NavLink>
                    <NavLink to="/education" className={({ isActive }) => isActive ? 'active' : ''}>
                        Education
                    </NavLink>

                </nav>
            </aside></>
    )
}