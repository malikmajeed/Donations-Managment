import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { MdTrendingUp, MdAttachMoney, MdWarning, MdCheckCircle } from 'react-icons/md';
import styles from './CausesStatistics.module.css';

export default function CausesStatistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.STATISTICS);
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch statistics');
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

  const formatPercentage = (value, total) => {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading statistics...</div>
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
        <h1 className={styles.title}>Causes Statistics</h1>
        <p className={styles.subtitle}>Overview of donation causes and funding progress</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MdTrendingUp />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Total Causes</h3>
            <p className={styles.statValue}>{stats?.totalCauses || 0}</p>
            <p className={styles.statSubtitle}>Active donation causes</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MdAttachMoney />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Total Budget</h3>
            <p className={styles.statValue}>{formatCurrency(stats?.totalBudgetRequired || 0)}</p>
            <p className={styles.statSubtitle}>Required funding</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MdCheckCircle />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Amount Collected</h3>
            <p className={styles.statValue}>{formatCurrency(stats?.totalAmountCollected || 0)}</p>
            <p className={styles.statSubtitle}>
              {formatPercentage(stats?.totalAmountCollected || 0, stats?.totalBudgetRequired || 1)} of goal
            </p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MdWarning />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Urgent Causes</h3>
            <p className={styles.statValue}>{stats?.urgentCauses || 0}</p>
            <p className={styles.statSubtitle}>Need immediate attention</p>
          </div>
        </div>
      </div>

      {stats?.typeBreakdown && (
        <div className={styles.breakdownSection}>
          <h2 className={styles.sectionTitle}>Causes by Type</h2>
          <div className={styles.breakdownGrid}>
            {Object.entries(stats.typeBreakdown).map(([type, count]) => (
              <div key={type} className={styles.breakdownCard}>
                <h3 className={styles.breakdownTitle}>{type}</h3>
                <p className={styles.breakdownCount}>{count}</p>
                <p className={styles.breakdownPercentage}>
                  {formatPercentage(count, stats.totalCauses)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats?.statusBreakdown && (
        <div className={styles.breakdownSection}>
          <h2 className={styles.sectionTitle}>Causes by Status</h2>
          <div className={styles.breakdownGrid}>
            {Object.entries(stats.statusBreakdown).map(([status, count]) => (
              <div key={status} className={styles.breakdownCard}>
                <h3 className={styles.breakdownTitle}>{status}</h3>
                <p className={styles.breakdownCount}>{count}</p>
                <p className={styles.breakdownPercentage}>
                  {formatPercentage(count, stats.totalCauses)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats?.recentCauses && stats.recentCauses.length > 0 && (
        <div className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>Recent Causes</h2>
          <div className={styles.recentList}>
            {stats.recentCauses.map((cause) => (
              <div key={cause._id} className={styles.recentItem}>
                <div className={styles.recentInfo}>
                  <h4 className={styles.recentTitle}>{cause.name}</h4>
                  <p className={styles.recentType}>{cause.type}</p>
                </div>
                <div className={styles.recentProgress}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ 
                        width: `${Math.min((cause.amountCollected / cause.budgetRequired) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  <p className={styles.progressText}>
                    {formatCurrency(cause.amountCollected)} / {formatCurrency(cause.budgetRequired)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 