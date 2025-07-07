import { useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { MdLocationOn, MdAccessTime, MdEdit, MdDelete, MdVisibility, MdCalendarToday } from 'react-icons/md';
import styles from './CauseCard.module.css';

export default function CauseCard({ cause, onDonate }) {
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

  const progressPercentage = Math.min((cause.amountCollected / cause.budgetRequired) * 100, 100);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const timeUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(cause.endDate);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Past due';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    if (diffDays < 7) return `${diffDays} days left`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks left`;
    return `${Math.ceil(diffDays / 30)} months left`;
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

  const TYPE_LABELS = {
    education: 'Education',
    empowerment: 'Empowerment',
    foodDistribution: 'Food Distribution',
    mobileClinic: 'Mobile Clinic',
    waterWells: 'Water Wells'
  };

  return (
    <div className={styles.card}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img
          src={cause.featureImage ? `${API_CONFIG.BASE_URL}/${cause.featureImage}` : '/default-avatar.avif'}
          alt={cause.name}
          className={styles.image}
        />
        {/* Urgent Badge */}
        {cause.isUrgent && (
          <div className={styles.urgentBadge}>
            Urgent
          </div>
        )}
        {/* Progress Badge */}
        <div className={styles.progressBadge}>
          {Math.round(progressPercentage)}% funded
        </div>
      </div>
      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>{cause.name}</h3>
        {/* Description */}
        <p className={styles.description}>{cause.description}</p>
        {/* Location */}
        <div className={styles.infoRow}>
          <MdLocationOn className={styles.icon} />
          <span className={styles.infoText}>{cause.location}</span>
        </div>
        {/* Date and Time Left */}
        <div className={styles.infoRow}>
          <MdCalendarToday className={styles.icon} />
          <span className={styles.infoText}>Needed By {formatDate(cause.endDate)}</span>
          
        </div>
        {/* Budget Information */}
        <div className={styles.budgetSection}>
          <div className={styles.budgetHeader}>
            <span className={styles.budgetRaised}>{formatCurrency(cause.amountCollected)} raised</span>
            <span className={styles.budgetTotal}>of {formatCurrency(cause.budgetRequired)}</span>
          </div>
          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className={styles.budgetRemaining}>
            {cause.budgetRequired - cause.amountCollected > 0
              ? `${formatCurrency(cause.budgetRequired - cause.amountCollected)} still needed`
              : 'Fully funded!'}
          </div>
        </div>
        {/* Donate Button */}
        <button
          onClick={() => onDonate && onDonate(cause._id)}
          className={styles.donateButton}
        >
          Donate Now
        </button>
      </div>
    </div>
  );
} 