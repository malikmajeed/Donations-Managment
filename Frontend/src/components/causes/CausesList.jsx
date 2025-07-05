import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import CauseCard from './CauseCard';
import styles from './CausesList.module.css';

export default function CausesList() {
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
      const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.LIST);
      const allCauses = response.data.causes || response.data || [];
      
      // Calculate pagination
      const startIndex = (currentPage - 1) * causesPerPage;
      const endIndex = startIndex + causesPerPage;
      const paginatedCauses = allCauses.slice(startIndex, endIndex);
      
      setCauses(paginatedCauses);
      setTotalPages(Math.ceil(allCauses.length / causesPerPage));
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Donation Causes</h1>
        <p className={styles.subtitle}>Support our community initiatives</p>
      </div>

      {causes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No causes found. Be the first to create a donation cause!</p>
        </div>
      ) : (
        <>
          <div className={styles.causesGrid}>
            {causes.map((cause) => (
              <CauseCard key={cause._id} cause={cause} onUpdate={fetchCauses} />
            ))}
          </div>

          {totalPages > 1 && (
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
  );
} 