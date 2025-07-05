import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { MdLocationOn, MdAccessTime, MdEdit, MdArrowBack, MdCalendarToday } from 'react-icons/md';
import styles from './ViewCause.module.css';

export default function ViewCause() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cause, setCause] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCause();
  }, [id]);

  const fetchCause = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.BY_ID(id));
      setCause(response.data.cause || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cause details');
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
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const progressPercentage = cause?.budgetRequired > 0 
    ? Math.round((cause.amountCollected / cause.budgetRequired) * 100)
    : 0;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading cause details...</div>
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

  if (!cause) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Cause not found</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => navigate('/causes')}
          className={styles.backButton}
        >
          <MdArrowBack />
          Back to Causes
        </button>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => navigate(`/causes/edit/${cause._id}`)}
            className={styles.editButton}
          >
            <MdEdit />
            Edit Cause
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          {cause.featureImage ? (
            <img 
              src={`${API_CONFIG.BASE_URL}/${cause.featureImage}`} 
              alt={cause.name}
              className={styles.featureImage}
            />
          ) : (
            <div className={styles.placeholderImage}>
              <span>No Image Available</span>
            </div>
          )}
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{cause.name}</h1>
            <div className={styles.badges}>
              <span 
                className={styles.typeBadge}
                style={{ backgroundColor: getTypeColor(cause.type) }}
              >
                {cause.type}
              </span>
              <span 
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(cause.status) }}
              >
                {cause.status}
              </span>
              {cause.isUrgent && (
                <span className={styles.urgentBadge}>
                  Urgent
                </span>
              )}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <MdLocationOn className={styles.icon} />
              <div>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>{cause.location || 'Not specified'}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <MdCalendarToday className={styles.icon} />
              <div>
                <span className={styles.label}>Start Date</span>
                <span className={styles.value}>{formatDate(cause.startDate)}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <MdAccessTime className={styles.icon} />
              <div>
                <span className={styles.label}>End Date</span>
                <span className={styles.value}>{formatDate(cause.endDate)}</span>
              </div>
            </div>
          </div>

          {cause.description && (
            <div className={styles.descriptionSection}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <p className={styles.description}>{cause.description}</p>
            </div>
          )}

          <div className={styles.fundingSection}>
            <h3 className={styles.sectionTitle}>Funding Progress</h3>
            
            <div className={styles.fundingStats}>
              <div className={styles.fundingItem}>
                <span className={styles.fundingLabel}>Budget Required</span>
                <span className={styles.fundingAmount}>{formatCurrency(cause.budgetRequired)}</span>
              </div>
              
              <div className={styles.fundingItem}>
                <span className={styles.fundingLabel}>Amount Collected</span>
                <span className={styles.fundingAmount}>{formatCurrency(cause.amountCollected)}</span>
              </div>
              
              <div className={styles.fundingItem}>
                <span className={styles.fundingLabel}>Remaining</span>
                <span className={styles.fundingAmount}>
                  {formatCurrency(cause.budgetRequired - cause.amountCollected)}
                </span>
              </div>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Progress</span>
                <span className={styles.progressPercentage}>{progressPercentage}%</span>
              </div>
              
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className={styles.metadataSection}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Created</span>
              <span className={styles.metadataValue}>{formatDate(cause.createdAt)}</span>
            </div>
            
            {cause.updatedAt && cause.updatedAt !== cause.createdAt && (
              <div className={styles.metadataItem}>
                <span className={styles.metadataLabel}>Last Updated</span>
                <span className={styles.metadataValue}>{formatDate(cause.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 