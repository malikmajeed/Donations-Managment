import { useEffect, useState } from 'react';
import StudentCard from '../../Students/studentsCards/index.jsx';
import styles from './AllStudents.module.css';
import axios from 'axios';

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    sponsorId: '',
    status: '',
    dateOrder: 'descending'
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/student/getAllStudents');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Filter and sort students
  let filteredStudents = students.filter(student => {
    let match = true;
    if (filters.sponsorId && student.sponsorId !== filters.sponsorId) match = false;
    if (filters.status && ((filters.status === 'sponsored' && !student.sponsorship) || (filters.status === 'not-sponsored' && student.sponsorship))) match = false;
    return match;
  });
  // Sort by date added
  filteredStudents = filteredStudents.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return filters.dateOrder === 'ascending' ? dateA - dateB : dateB - dateA;
  });

  if (loading) return <div className={styles.loading}>Loading students...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.allStudentsWrapper}>
      <h2 className={styles.sectionTitle}>All Students</h2>
      <div className={styles.filtersContainer}>
        <div className={styles.filterGroup}>
          <label>Sponsor ID</label>
          <input
            type="text"
            name="sponsorId"
            value={filters.sponsorId}
            onChange={handleFilterChange}
            className={styles.filterInput}
            placeholder="Sponsor ID..."
          />
        </div>
        <div className={styles.filterGroup}>
          <label>Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All</option>
            <option value="sponsored">Sponsored</option>
            <option value="not-sponsored">Not Sponsored</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Date Added</label>
          <select
            name="dateOrder"
            value={filters.dateOrder}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </div>
      <div className={styles.studentsGrid}>
        {filteredStudents.map(student => (
          <StudentCard
            key={student._id || student.id}
            profileImage={student.profileUrl || student.profileImage}
            firstName={student.firstName}
            lastName={student.lastName}
            gender={student.gender}
            age={student.age}
            studentClass={student.studentClass}
            fee={student.monthlyFee || student.fee}
            sponsored={student.sponsorship || student.sponsored}
            // Admin-specific props for buttons (to be handled in StudentCard)
            adminView
            studentId={student._id || student.id}
          />
        ))}
      </div>
    </div>
  );
} 