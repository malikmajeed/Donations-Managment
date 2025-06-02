import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { Search, ArrowUpDown, User, Filter } from 'lucide-react';

export default function GetAllStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        name: '',
        school: '',
        grade: '',
        status: ''
    });
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/student/getAllStudents');
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch students');
            setLoading(false);
        }
    };

    const handleFilterChange = (column, value) => {
        setFilters(prev => ({
            ...prev,
            [column]: value
        }));
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedStudents = students
        .filter(student => {
            const nameMatch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(filters.name.toLowerCase());
            const schoolMatch = (student.school || '').toLowerCase().includes(filters.school.toLowerCase());
            const gradeMatch = (student.studentGrade || '').toLowerCase().includes(filters.grade.toLowerCase());
            const statusMatch = filters.status === '' || 
                (filters.status === 'sponsored' && student.sponsorship) ||
                (filters.status === 'not-sponsored' && !student.sponsorship);

            return nameMatch && schoolMatch && gradeMatch && statusMatch;
        })
        .sort((a, b) => {
            if (!sortConfig.key) return 0;

            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';

            if (sortConfig.direction === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>All Students</h1>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>Name</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('firstName')}
                                        />
                                    </div>
                                    <div className={styles.filterContainer}>
                                        <Filter className={styles.filterIcon} />
                                        <input
                                            type="text"
                                            placeholder="Filter name..."
                                            value={filters.name}
                                            onChange={(e) => handleFilterChange('name', e.target.value)}
                                            className={styles.filterInput}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th className={styles.schoolColumn}>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>School</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('school')}
                                        />
                                    </div>
                                    <div className={styles.filterContainer}>
                                        <Filter className={styles.filterIcon} />
                                        <input
                                            type="text"
                                            placeholder="Filter school..."
                                            value={filters.school}
                                            onChange={(e) => handleFilterChange('school', e.target.value)}
                                            className={styles.filterInput}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th className={styles.gradeColumn}>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>Grade</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('studentGrade')}
                                        />
                                    </div>
                                    <div className={styles.filterContainer}>
                                        <Filter className={styles.filterIcon} />
                                        <input
                                            type="text"
                                            placeholder="Filter grade..."
                                            value={filters.grade}
                                            onChange={(e) => handleFilterChange('grade', e.target.value)}
                                            className={styles.filterInput}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>Status</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('sponsorship')}
                                        />
                                    </div>
                                    <div className={styles.filterContainer}>
                                        <Filter className={styles.filterIcon} />
                                        <select
                                            value={filters.status}
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            className={styles.filterSelect}
                                        >
                                            <option value="">All</option>
                                            <option value="sponsored">Sponsored</option>
                                            <option value="not-sponsored">Not Sponsored</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedStudents.map((student) => (
                            <tr key={student._id} className={styles.tableRow}>
                                <td>
                                    <div className={styles.studentName}>
                                        <div className={styles.profileImage}>
                                            {student.profileUrl ? (
                                                <img 
                                                    src={`http://localhost:3000${student.profileUrl}`} 
                                                    alt={`${student.firstName}'s profile`}
                                                />
                                            ) : (
                                                <div className={styles.placeholderImage}>
                                                    <User className={styles.userIcon} />
                                                </div>
                                            )}
                                        </div>
                                        <span>{student.firstName} {student.lastName}</span>
                                    </div>
                                </td>
                                <td>{student.school || 'N/A'}</td>
                                <td>{student.studentGrade || 'N/A'}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${student.sponsorship ? styles.sponsored : styles.notSponsored}`}>
                                        {student.sponsorship ? 'Sponsored' : 'Not Sponsored'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className={styles.viewButton}
                                        onClick={() => window.location.href = `/student/${student._id}`}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 