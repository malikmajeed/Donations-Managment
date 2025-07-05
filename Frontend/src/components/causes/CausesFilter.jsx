import { useState } from 'react';
import { MdSearch, MdFilterList, MdClear } from 'react-icons/md';
import styles from './CausesFilter.module.css';

const CAUSE_TYPES = [
  'education',
  'empowerment',
  'foodDistribution',
  'mobileClinic',
  'waterWells'
];

const STATUS_OPTIONS = [
  'active',
  'completed',
  'paused'
];

export default function CausesFilter({ onFilterChange, filters }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    search: '',
    type: '',
    status: '',
    isUrgent: '',
    minBudget: '',
    maxBudget: '',
    ...filters
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      type: '',
      status: '',
      isUrgent: '',
      minBudget: '',
      maxBudget: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '' && value !== false);

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <MdSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search causes by name, location, or description..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={styles.searchInput}
          />
          {localFilters.search && (
            <button
              onClick={() => handleFilterChange('search', '')}
              className={styles.clearButton}
            >
              <MdClear />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.filterToggle}
        >
          <MdFilterList />
          Filters
          {hasActiveFilters && <span className={styles.filterBadge}>•</span>}
        </button>
      </div>

      {isExpanded && (
        <div className={styles.filterSection}>
          <div className={styles.filterGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Type</label>
              <select
                value={localFilters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Types</option>
                {CAUSE_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <select
                value={localFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Status</option>
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Urgency</label>
              <select
                value={localFilters.isUrgent}
                onChange={(e) => handleFilterChange('isUrgent', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Causes</option>
                <option value="true">Urgent Only</option>
                <option value="false">Non-Urgent Only</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Min Budget</label>
              <input
                type="number"
                placeholder="Min amount"
                value={localFilters.minBudget}
                onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                className={styles.filterInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Max Budget</label>
              <input
                type="number"
                placeholder="Max amount"
                value={localFilters.maxBudget}
                onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                className={styles.filterInput}
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className={styles.filterActions}>
              <button
                onClick={handleClearFilters}
                className={styles.clearFiltersButton}
              >
                <MdClear />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 