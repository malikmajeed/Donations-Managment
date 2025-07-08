import React from 'react';
import styles from './Dashboard.module.css';
import {
  MdAttachMoney, MdTrendingUp, MdPeople, MdGroup, MdListAlt
} from 'react-icons/md';

const summaryStats = [
  { label: 'Donations', value: '$25,000', icon: <MdAttachMoney />, color: styles.cardGreen },
  { label: 'Amount Needed', value: '$40,000', icon: <MdTrendingUp />, color: styles.cardBlue },
  { label: 'Users', value: '120', icon: <MdPeople />, color: styles.cardPurple },
  { label: 'Students', value: '60', icon: <MdGroup />, color: styles.cardNeutral },
  { label: 'Students', value: '24', pill: 'Sponsored', pillColor: styles.pillGreen, color: styles.cardGreen },
  { label: 'Students', value: '36', pill: 'Not Sponsored', pillColor: styles.pillRed, color: styles.cardRed },
  { label: 'Active Causes', value: '15', icon: <MdListAlt />, color: styles.cardIndigo },
];

const topDonors = [
  { name: 'John Doe', amount: '$2,000' },
  { name: 'Jane Smith', amount: '$1,800' },
  { name: 'Ali Khan', amount: '$1,500' },
  { name: 'Sara Lee', amount: '$1,200' },
  { name: 'Mohammed Noor', amount: '$1,100' },
  { name: 'Emily Clark', amount: '$1,000' },
  { name: 'David Kim', amount: '$950' },
  { name: 'Fatima Zahra', amount: '$900' },
  { name: 'Omar Farooq', amount: '$850' },
  { name: 'Linda Park', amount: '$800' },
];

export default function Dashboard() {
  return (
    <div className={styles.dashboardContent}>
      <h2 className={styles.sectionTitle}>Dashboard Overview</h2>
      <div className={styles.statsGrid}>
        {summaryStats.map((stat, idx) => (
          <div key={idx + stat.label} className={styles.statCard}>
            {stat.pill ? (
              <span className={`${styles.statPill} ${stat.pillColor}`}>{stat.pill}</span>
            ) : (
              <div className={`${styles.iconCircle} ${stat.color}`}>{stat.icon}</div>
            )}
            <div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3>Donations Over Months</h3>
          <div className={styles.chartPlaceholder}>[Graph Placeholder]</div>
        </div>
        <div className={styles.chartCard}>
          <h3>Donations Over Year</h3>
          <div className={styles.chartPlaceholder}>[Graph Placeholder]</div>
        </div>
      </div>

      <div className={styles.topDonorsSection}>
        <h3>Top 10 Donors</h3>
        <table className={styles.donorsTable}>
          <thead>
            <tr>
              <th className={styles.donorsTableNumber}>#</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {topDonors.map((donor, idx) => (
              <tr key={donor.name}>
                <td className={styles.donorsTableNumber}>{idx + 1}</td>
                <td>{donor.name}</td>
                <td>{donor.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 