import { useState, useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from '../../config/api.endpoints';
import CauseCard from './CauseCard';
import styles from './CausesList.module.css';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import React from 'react';

const StatCard = ({ title, value, change, changeType, icon, color }) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-gray-600';
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

const UserStats = () => {
  const stats = [
    {
      title: 'Total Causes',
      value: '1,024',
      change: '+5.2%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6 text-white" />, 
      color: 'bg-blue-500'
    },
    {
      title: 'Active Causes',
      value: '812',
      change: '+2.1%',
      changeType: 'positive',
      icon: <UserCheck className="w-6 h-6 text-white" />, 
      color: 'bg-green-500'
    },
    {
      title: 'Completed Causes',
      value: '212',
      change: '+1.7%',
      changeType: 'positive',
      icon: <UserX className="w-6 h-6 text-white" />, 
      color: 'bg-red-500'
    },
    {
      title: 'Urgent Causes',
      value: '37',
      change: '+0.8%',
      changeType: 'positive',
      icon: <TrendingUp className="w-6 h-6 text-white" />, 
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default function CausesList({ limit, causeType }) {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const causesPerPage = 9;

  useEffect(() => {
    fetchCauses();
  }, [currentPage]);

  const fetchCauses = async () => {
    try {
      setLoading(true);
      let response;
      
      if (causeType) {
        // Fetch causes by specific type
        response = await axios.get(`${ENDPOINTS.CAUSES.LIST}?type=${causeType}`);
      } else {
        // Fetch all causes
        response = await axios.get(ENDPOINTS.CAUSES.LIST);
      }
      
      const allCauses = response.data.causes || response.data || [];
      
      // If limit is provided, use it instead of pagination
      if (limit) {
        setCauses(allCauses.slice(0, limit));
        setTotalPages(1);
      } else {
        // Calculate pagination
        const startIndex = (currentPage - 1) * causesPerPage;
        const endIndex = startIndex + causesPerPage;
        const paginatedCauses = allCauses.slice(startIndex, endIndex);
        
        setCauses(paginatedCauses);
        setTotalPages(Math.ceil(allCauses.length / causesPerPage));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch causes');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading causes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={limit ? "" : "space-y-8"}>
      {!limit && (
        <>
          {/* Header Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Donation Causes</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Support our community initiatives. Explore, donate, and make a difference by supporting a cause that matters to you.
            </p>
          </div>
          <UserStats />
        </>
      )}
      
      <div className={limit ? "" : styles.container}>
        {!limit && (
          <div className={styles.header}>
            <h1 className={styles.title}>Donation Causes</h1>
            <p className={styles.subtitle}>Support our community initiatives</p>
          </div>
        )}

        {causes.length === 0 ? (
          <div className={limit ? "text-center py-8 text-gray-500" : styles.emptyState}>
            <p>No causes found. Be the first to create a donation cause!</p>
          </div>
        ) : (
          <>
            <div className={limit ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : styles.causesGrid}>
              {causes.map((cause) => (
                <CauseCard key={cause._id} cause={cause} onUpdate={fetchCauses} />
              ))}
            </div>

            {!limit && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 