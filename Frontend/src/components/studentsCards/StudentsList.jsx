import { useEffect, useState } from 'react';
import StudentCard from './index.jsx';
import styles from './index.module.css';

const STUDENTS_PER_PAGE = 9;

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/student/getAllStudents')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch students');
        return res.json();
      })
      .then(data => {
        setStudents(data.students || data); // support both {students: [...]} and [...] formats
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(students.length / STUDENTS_PER_PAGE);
  const startIdx = (page - 1) * STUDENTS_PER_PAGE;
  const currentStudents = students.slice(startIdx, startIdx + STUDENTS_PER_PAGE);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));
  const handlePage = (p) => setPage(p);

  if (loading) return <div style={{textAlign: 'center', margin: '2rem'}}>Loading students...</div>;
  if (error) return <div style={{color: 'red', textAlign: 'center', margin: '2rem'}}>{error}</div>;

  return (
    <div>
      <div className={styles.studentsGrid}>
        {currentStudents.map(student => (
          <StudentCard key={student._id || student.id}
            profileImage={student.profileImage}
            firstName={student.firstName}
            lastName={student.lastName}
            gender={student.gender}
            age={student.age}
            studentClass={student.studentClass}
            fee={student.fee}
            sponsored={student.sponsored}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={page === 1}>&laquo; Prev</button>
        {Array.from({length: totalPages}, (_, i) => (
          <button
            key={i+1}
            onClick={() => handlePage(i+1)}
            className={page === i+1 ? styles.activePage : ''}
          >
            {i+1}
          </button>
        ))}
        <button onClick={handleNext} disabled={page === totalPages}>Next &raquo;</button>
      </div>
    </div>
  );
} 