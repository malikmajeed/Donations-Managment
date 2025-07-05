import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import CauseCard from './CauseCard';
import styles from './UrgentCauses.module.css';

export default function UrgentCauses() {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUrgentCauses();
  }, []);

  const fetchUrgentCauses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.URGENT);
      const urgentCauses = response.data.causes || response.data || [];
      setCauses(urgentCauses);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch urgent causes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading urgent causes...</div>
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Urgent Causes</h1>
          <p className={styles.subtitle}>
            These causes need immediate attention and funding
          </p>
          <div className={styles.urgentCount}>
            {causes.length} urgent cause{causes.length !== 1 ? 's' : ''} found
          </div>
        </div>
        <div className={styles.urgentIcon}>
          <span className={styles.urgentSymbol}>⚠️</span>
        </div>
      </div>

      {causes.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎉</div>
          <h3 className={styles.emptyTitle}>No Urgent Causes</h3>
          <p className={styles.emptyMessage}>
            Great news! There are currently no urgent causes that need immediate attention.
          </p>
        </div>
      ) : (
        <div className={styles.causesGrid}>
          {causes.map((cause) => (
            <div key={cause._id} className={styles.urgentCardWrapper}>
              <CauseCard cause={cause} onUpdate={fetchUrgentCauses} />
            </div>
          ))}
        </div>
      )}

      <div className={styles.urgentInfo}>
        <h3 className={styles.infoTitle}>About Urgent Causes</h3>
        <p className={styles.infoText}>
          Urgent causes are marked as high priority and require immediate funding to meet their goals. 
          These causes often have pressing deadlines or serve critical community needs.
        </p>
        <div className={styles.infoTips}>
          <h4>How you can help:</h4>
          <ul>
            <li>Share urgent causes on social media</li>
            <li>Make a donation if possible</li>
            <li>Contact the organization for more information</li>
            <li>Volunteer your time or skills</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 