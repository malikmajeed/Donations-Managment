import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
   MdListAlt, MdSchool, MdEmojiObjects, MdFastfood, MdLocalHospital, MdOpacity, MdDashboard, MdGroup, MdLightbulb, MdWaterDrop
  } from 'react-icons/md';
  
export default function Sidebar() {
    const getIconClassName = (isActive) => 
        `flex-shrink-0 w-6 h-6 transition duration-75 ${
            isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
        }`;

    return (
        <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-50" aria-label="Sidebar">
            <div className="px-3 py-4 overflow-y-auto h-full">
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
                            {({ isActive }) => (
                                <>
                                    <MdDashboard className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                                </>
                            )}
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
                            {({ isActive }) => (
                                <>
                                    <MdGroup className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Students</span>
                                </>
                            )}
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
                            {({ isActive }) => (
                                <>
                                    <MdSchool className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Education</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/empowerment" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <MdLightbulb className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Empowerment</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/food-distribution" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <MdFastfood className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Food Distribution</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/mobile-clinic" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <MdLocalHospital className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Mobile Clinic</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/water-wells" 
                            className={({ isActive }) => 
                                `flex items-center p-2 text-base font-normal rounded-lg transition duration-75 ${
                                    isActive 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <MdWaterDrop className={getIconClassName(isActive)} />
                                    <span className="flex-1 ml-3 whitespace-nowrap">Water Wells</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}