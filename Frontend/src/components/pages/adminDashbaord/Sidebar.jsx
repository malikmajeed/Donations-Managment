import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    MdListAlt, MdSchool, MdEmojiObjects, MdFastfood, MdLocalHospital, MdOpacity, MdDashboard, MdGroup
} from 'react-icons/md';

export default function Sidebar() {
    return (
        <aside className="w-64" aria-label="Sidebar">
            <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
                <div className="mb-4 px-2 py-3">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Admin</span>
                </div>
                <ul className="space-y-2">
                    <li>
                        <NavLink 
                            to="/dashboard" 
                            end 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <MdDashboard className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white :active text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/students" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <MdGroup className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Students</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/education" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <MdSchool className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Education</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/causes" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <MdListAlt className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Causes</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/donations" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            <MdEmojiObjects className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Donations</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}