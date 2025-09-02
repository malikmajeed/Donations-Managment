import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ENDPOINTS from '../../config/api.endpoints';
import CauseCard from './CauseCard';
import styles from './CausesByType.module.css';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import React from 'react';

const TYPE_LABELS = {
  education: 'Education',
  empowerment: 'Empowerment',
  foodDistribution: 'Food Distribution',
  mobileClinic: 'Mobile Clinic',
  waterWells: 'Water Wells'
};

const TYPE_DESCRIPTIONS = {
  education: 'Supporting educational initiatives and learning opportunities for communities in need.',
  empowerment: 'Programs designed to empower individuals and communities through skills development and capacity building.',
  foodDistribution: 'Providing food assistance and nutrition support to vulnerable populations.',
  mobileClinic: 'Healthcare services delivered through mobile clinics to reach remote and underserved areas.',
  waterWells: 'Building and maintaining water wells to provide clean drinking water to communities.'
};

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

const UserStats = ({ type, causes }) => {
  // Example stats, you can replace with real data if available
  const stats = [
    {
      title: `Total ${TYPE_LABELS[type] || 'Causes'}`,
      value: causes.length.toString(),
      change: '+5.2%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6 text-white" />, 
      color: 'bg-blue-500'
    },
    {
      title: 'Active',
      value: causes.filter(c => c.status === 'active').length.toString(),
      change: '+2.1%',
      changeType: 'positive',
      icon: <UserCheck className="w-6 h-6 text-white" />, 
      color: 'bg-green-500'
    },
    {
      title: 'Completed',
      value: causes.filter(c => c.status === 'completed').length.toString(),
      change: '+1.7%',
      changeType: 'positive',
      icon: <UserX className="w-6 h-6 text-white" />, 
      color: 'bg-red-500'
    },
    {
      title: 'Urgent',
      value: causes.filter(c => c.isUrgent).length.toString(),
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

export default function CausesByType() {
  const { type } = useParams();
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (type) {
      fetchCausesByType();
    }
  }, [type]);

  const fetchCausesByType = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ENDPOINTS.CAUSES.BY_TYPE(type));
      const typeCauses = response.data.causes || response.data || [];
      setCauses(typeCauses);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch causes');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'education': return '#3b82f6';
      case 'empowerment': return '#8b5cf6';
      case 'foodDistribution': return '#f59e0b';
      case 'mobileClinic': return '#ef4444';
      case 'waterWells': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading {TYPE_LABELS[type]} causes...</div>
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

  if (!TYPE_LABELS[type]) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Invalid cause type</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{TYPE_LABELS[type]} Causes</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{TYPE_DESCRIPTIONS[type]}</p>
      </div>
      <UserStats type={type} causes={causes} />
      {causes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <h3 className={styles.emptyTitle}>No {TYPE_LABELS[type]} Causes</h3>
          <p className={styles.emptyMessage}>
            There are currently no {TYPE_LABELS[type].toLowerCase()} causes available.
            Check back later or browse other cause types.
          </p>
        </div>
      ) : (
        <div className={styles.causesGrid}>
          {causes.map((cause) => (
            <CauseCard key={cause._id} cause={cause} onUpdate={fetchCausesByType} />
          ))}
        </div>
      )}

      <div className={styles.typeInfo}>
        <h3 className={styles.infoTitle}>About {TYPE_LABELS[type]} Causes</h3>
        <p className={styles.infoText}>{TYPE_DESCRIPTIONS[type]}</p>
        
        <div className={styles.typeStats}>
          <h4>Quick Stats:</h4>
          <ul>
            <li>Total causes: {causes.length}</li>
            <li>Active causes: {causes.filter(c => c.status === 'active').length}</li>
            <li>Completed causes: {causes.filter(c => c.status === 'completed').length}</li>
            <li>Urgent causes: {causes.filter(c => c.isUrgent).length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 