import { useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { MdLocationOn, MdAccessTime, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import styles from './CauseCard.module.css';

export default function CauseCard({ cause, onUpdate }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this cause?')) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(API_CONFIG.ENDPOINTS.CAUSES.DELETE(cause._id));
      onUpdate();
    } catch (err) {
      console.error('Failed to delete cause:', err);
      alert('Failed to delete cause');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No end date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'completed': return '#3b82f6';
      case 'paused': return '#f59e0b';
      default: return '#6b7280';
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

  const progressPercentage = cause.budgetRequired > 0 
    ? Math.round((cause.amountCollected / cause.budgetRequired) * 100)
    : 0;

  const TYPE_LABELS = {
    education: 'Education',
    empowerment: 'Empowerment',
    foodDistribution: 'Food Distribution',
    mobileClinic: 'Mobile Clinic',
    waterWells: 'Water Wells'
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {cause.featureImage ? (
          <img 
            src={`${API_CONFIG.BASE_URL}/${cause.featureImage}`} 
            alt={cause.name}
            className={styles.featureImage}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span>No Image</span>
          </div>
        )}
        
        {cause.isUrgent && (
          <div className={styles.urgentBadge}>
            Urgent
          </div>
        )}
        
        <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor(cause.status) }}>
          {cause.status}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{cause.name}</h3>
          <span 
            className={styles.typeBadge}
            style={{ backgroundColor: getTypeColor(cause.type) }}
          >
            {TYPE_LABELS[cause.type] || cause.type}
          </span>
        </div>

        <div className={styles.location}>
          <MdLocationOn className={styles.icon} />
          <span>{cause.location || 'Location not specified'}</span>
        </div>

        <div className={styles.endDate}>
          <MdAccessTime className={styles.icon} />
          <span>Ends: {formatDate(cause.endDate)}</span>
        </div>

        <div className={styles.funding}>
          <div className={styles.fundingHeader}>
            <span className={styles.fundingLabel}>Funding Progress</span>
            <span className={styles.fundingAmount}>
              {formatCurrency(cause.amountCollected)} / {formatCurrency(cause.budgetRequired)}
            </span>
          </div>
          
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          
          <span className={styles.progressText}>{progressPercentage}% Complete</span>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.actionButton} ${styles.viewButton}`}
            onClick={() => window.open(`/causes/${cause._id}`, '_blank')}
          >
            <MdVisibility />
            View
          </button>
          
          <button 
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => window.open(`/causes/edit/${cause._id}`, '_blank')}
          >
            <MdEdit />
            Edit
          </button>
          
          <button 
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={handleDelete}
            disabled={loading}
          >
            <MdDelete />
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>

        <p className={styles.description}>
          {cause.description || 'No description available'}
        </p>
      </div>
    </div>
  );
} 