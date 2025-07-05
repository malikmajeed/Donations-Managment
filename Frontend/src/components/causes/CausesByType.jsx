import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import CauseCard from './CauseCard';
import styles from './CausesByType.module.css';

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
      const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.BY_TYPE(type));
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.typeInfo}>
          <div 
            className={styles.typeBadge}
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {TYPE_LABELS[type]}
          </div>
          <h1 className={styles.title}>{TYPE_LABELS[type]} Causes</h1>
          <p className={styles.subtitle}>{TYPE_DESCRIPTIONS[type]}</p>
          <div className={styles.causeCount}>
            {causes.length} cause{causes.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

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