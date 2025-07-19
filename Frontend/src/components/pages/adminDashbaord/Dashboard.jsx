import React from 'react';
import {
  MdAttachMoney, MdTrendingUp, MdPeople, MdGroup, MdListAlt
} from 'react-icons/md';
import { motion } from 'framer-motion';

const summaryStats = [
  { label: 'Donations', value: '$25,000', icon: <MdAttachMoney />, color: 'bg-green-100 text-green-700' },
  { label: 'Amount Needed', value: '$40,000', icon: <MdTrendingUp />, color: 'bg-blue-100 text-blue-700' },
  { label: 'Users', value: '120', icon: <MdPeople />, color: 'bg-purple-100 text-purple-700' },
  { label: 'Students', value: '60', icon: <MdGroup />, color: 'bg-gray-100 text-gray-700' },
  { label: 'Students', value: '24', pill: 'Sponsored', pillColor: 'bg-green-200 text-green-800', color: 'bg-green-100 text-green-700' },
  { label: 'Students', value: '36', pill: 'Not Sponsored', pillColor: 'bg-red-200 text-red-800', color: 'bg-red-100 text-red-700' },
  { label: 'Active Causes', value: '15', icon: <MdListAlt />, color: 'bg-indigo-100 text-indigo-700' },
];

const topDonors = [
  { name: 'John Doe', amount: '$2,000' },
  { name: 'Jane Smith', amount: '$1,800' },
  { name: 'Ali Khan', amount: '$1,500' },
  { name: 'Sara Lee', amount: '$1,200' },
  { name: 'Mohammed Noor', amount: '$1,100' },
  { name: 'Emily Clark', amount: '$1,000' },
  { name: 'David Kim', amount: '$950' },
  { name: 'Fatima Zahra', amount: '$900' },
  { name: 'Omar Farooq', amount: '$850' },
  { name: 'Linda Park', amount: '$800' },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, idx) => (
          <motion.div
            key={idx + stat.label}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeInOut', delay: idx * 0.08 }}
            className={`rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4 ${stat.color}`}
          >
            {stat.pill ? (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${stat.pillColor}`}>{stat.pill}</span>
            ) : (
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-white/70`}>{stat.icon}</div>
            )}
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donations Over Months</h3>
          <div className="h-40 flex items-center justify-center text-gray-400 text-xl font-semibold bg-gray-50 rounded-lg">[Graph Placeholder]</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donations Over Year</h3>
          <div className="h-40 flex items-center justify-center text-gray-400 text-xl font-semibold bg-gray-50 rounded-lg">[Graph Placeholder]</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Donors</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topDonors.map((donor, idx) => (
                <motion.tr
                  key={donor.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: 'easeInOut', delay: idx * 0.06 }}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-semibold">{donor.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 