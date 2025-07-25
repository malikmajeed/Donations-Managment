import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users as UsersIcon,
  UserCheck,
  UserX,
  TrendingUp,
  Edit,
  Search,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { API_CONFIG } from '../../../config/api.config.js';

// StatCard Component
const StatCard = ({ title, value, change, changeType, icon, color }) => {
  const changeColor =
    changeType === 'positive'
      ? 'text-green-600'
      : changeType === 'negative'
      ? 'text-red-600'
      : 'text-gray-600';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${changeColor} flex items-center`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
};

// UserStats Component
const UserStats = ({ users }) => {
  const totalUsers = users.length;
  const adminUsers = users.filter((user) => user.role === 'admin').length;
  const donorUsers = users.filter((user) => user.role === 'donor').length;
  const usersWithDonations = users.filter((user) => user.donations && user.donations.length > 0).length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      change: '+5.2%',
      changeType: 'positive',
      icon: <UsersIcon className="w-6 h-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Admin Users',
      value: adminUsers.toString(),
      change: '+2.1%',
      changeType: 'positive',
      icon: <UserCheck className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Donor Users',
      value: donorUsers.toString(),
      change: '+8.3%',
      changeType: 'positive',
      icon: <UserX className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Donors',
      value: usersWithDonations.toString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_CONFIG.ENDPOINTS.USER.GET_ALL_USERS);
        setUsers(response.data.users || response.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.fName} ${user.lName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesGender = genderFilter === 'all' || user.gender === genderFilter;

    return matchesSearch && matchesRole && matchesGender;
  });

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
    alert(`Edit functionality for user ${userId} will be implemented`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
        <p className="text-gray-600">Manage all users in the system</p>
      </div>

      {/* Stats */}
      <UserStats users={users} />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="donor">Donor</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['#', 'Profile', 'Full Name', 'Role', 'Email', 'Gender', 'No. of Donations', 'Actions'].map((heading) => (
                  <th
                    key={heading}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-3 py-2 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-3 py-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {user.profileUrl ? (
                          <img
                            src={user.profileUrl}
                            alt={`${user.fName} ${user.lName}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                            {(user.fName?.charAt(0) || '') + (user.lName?.charAt(0) || '')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">
                      {user.fName} {user.lName}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900">{user.email}</td>
                    <td className="px-3 py-2 text-sm capitalize text-gray-900">{user.gender}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {Array.isArray(user.donations)
                          ? user.donations.length
                          : user.donations
                          ? 1
                          : 0}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 text-center text-gray-600">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
}
