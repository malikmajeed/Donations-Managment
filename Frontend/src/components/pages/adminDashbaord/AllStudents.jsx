import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserCheck, UserX, TrendingUp, Plus, Search, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import AddStudent from '../../students/addStudent/index.jsx';

// StatCard component
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

// UserStats component
const UserStats = ({ students }) => {
  const totalStudents = students.length;
  const sponsoredStudents = students.filter(
    (student) => student.sponsorship || student.sponsored
  ).length;
  const unSponsoredStudents = totalStudents - sponsoredStudents;
  const maleStudents = students.filter((student) => student.gender === 'male').length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents.toString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Sponsored Students',
      value: sponsoredStudents.toString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: <UserCheck className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Unsponsored Students',
      value: unSponsoredStudents.toString(),
      change: '-3.1%',
      changeType: 'negative',
      icon: <UserX className="w-6 h-6 text-white" />,
      color: 'bg-red-500',
    },
    {
      title: 'Male Students',
      value: maleStudents.toString(),
      change: '+15.3%',
      changeType: 'positive',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
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

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/student/getAllStudents');
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'sponsored' && (student.sponsorship || student.sponsored)) ||
      (statusFilter === 'not-sponsored' && !(student.sponsorship || student.sponsored));

    const matchesGender = genderFilter === 'all' || student.gender === genderFilter;
    const matchesGrade =
      gradeFilter === 'all' ||
      student.studentGrade === gradeFilter ||
      student.studentClass === gradeFilter;

    return matchesSearch && matchesStatus && matchesGender && matchesGrade;
  });

  const handleEdit = (studentId) => {
    console.log('Edit student:', studentId);
    alert(`Edit functionality for student ${studentId} will be implemented`);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
            <p className="text-gray-600">Manage all students in the system</p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setShowAddStudent(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            onClick={() => setShowAddStudent(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <AddStudent />
        </div>
      )}

      {/* Stats */}
      <UserStats students={students} />

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Select Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Status</option>
              <option value="sponsored">Sponsored</option>
              <option value="not-sponsored">Not Sponsored</option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>


            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Grade</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['#', 'Profile', 'Full Name', 'Gender', 'Grade', 'Status', 'Actions'].map(
                  (label) => (
                    <th
                      key={label}
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {label}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-gray-500">
                    No students found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-3 py-2 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-3 py-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {student.profileUrl ? (
                          <img
                            src={student.profileUrl}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}
                        {!student.profileUrl && (
                          <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                            {student.firstName.charAt(0)}
                            {student.lastName.charAt(0)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="px-3 py-2 text-sm capitalize text-gray-900">{student.gender}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">
                      {student.studentGrade || student.studentClass || 'N/A'}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.sponsorship || student.sponsored
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.sponsorship || student.sponsored
                          ? 'Sponsored'
                          : 'Not Sponsored'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-sm font-medium">
                      <button
                        onClick={() => handleEdit(student._id)}
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
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  );
}
