import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { Search, ArrowUpDown, User, Filter, DollarSign } from 'lucide-react';
import ProfileCard from '../../Models/StdProfile_Card';
import FeeManagement from '../../feeManagement';



export default function GetAllStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCardOpen, setIsCardOpen]=useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showFeeModal, setShowFeeModal] = useState(false);
    const [filters, setFilters] = useState({
        name: '',
        school: '',
        grade: '',
        status: '',
        feeStatus: ''
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
            console.log(`getAll students ${response.data}`)
            setStudents(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch students');
            setLoading(false);
        }
    };



    // const onMouseOver=()=>{
       
    //     setIsCardOpen(true)
    // }


    // const onMouseOut = ()=>{
    //     setIsCardOpen(false);
    // }
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
            const feeStatusMatch = filters.feeStatus === '' || 
                (filters.feeStatus === student.feeStatus);

            return nameMatch && schoolMatch && gradeMatch && statusMatch && feeStatusMatch;
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

            <div className={styles.filtersContainer}>
                <div className={styles.filterGroup}>
                    <label>Name</label>
                    <div className={styles.filterInputWrapper}>
                        <Filter className={styles.filterIcon} />
                        <input
                            type="text"
                            placeholder="Filter by name..."
                            value={filters.name}
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                            className={styles.filterInput}
                        />
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label>School</label>
                    <div className={styles.filterInputWrapper}>
                        <Filter className={styles.filterIcon} />
                        <input
                            type="text"
                            placeholder="Filter by school..."
                            value={filters.school}
                            onChange={(e) => handleFilterChange('school', e.target.value)}
                            className={styles.filterInput}
                        />
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label>Grade</label>
                    <div className={styles.filterInputWrapper}>
                        <Filter className={styles.filterIcon} />
                        <input
                            type="text"
                            placeholder="Filter by grade..."
                            value={filters.grade}
                            onChange={(e) => handleFilterChange('grade', e.target.value)}
                            className={styles.filterInput}
                        />
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label>Status</label>
                    <div className={styles.filterInputWrapper}>
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

                <div className={styles.filterGroup}>
                    <label>Fee Status</label>
                    <div className={styles.filterInputWrapper}>
                        <Filter className={styles.filterIcon} />
                        <select
                            value={filters.feeStatus}
                            onChange={(e) => handleFilterChange('feeStatus', e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="">All</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.srNoColumn}>No.</th>
                            <th>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>Name</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('firstName')}
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
                                </div>
                            </th>
                            <th>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>Monthly Fee</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('monthlyFee')}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className={styles.columnHeader}>
                                    <div className={styles.headerContent}>
                                        <span>Fee Status</span>
                                        <ArrowUpDown 
                                            className={styles.sortIcon} 
                                            onClick={() => handleSort('feeStatus')}
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
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedStudents.map((student, index) => (
                            <tr key={student._id} className={styles.tableRow}>
                                <td className={styles.srNoColumn}>{index + 1}</td>
                                <td>
                                    <span className={styles.studentName}>
                                        {student.firstName} {student.lastName}
                                    </span>
                                </td>
                                <td>{student.school || 'N/A'}</td>
                                <td>{student.studentGrade || 'N/A'}</td>
                                <td>PKR {student.monthlyFee || '0'}</td>
                                <td>
                                    <span className={`${styles.feeStatusBadge} ${styles[student.feeStatus || 'pending']}`}>
                                        {student.feeStatus || 'pending'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`${styles.statusBadge} ${student.sponsorship ? styles.sponsored : styles.notSponsored}`}>
                                        {student.sponsorship ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className={styles.viewButton}
                                        
                                        // onMouseOver={onMouseOver}                    a
                                        
                                        // onMouseOut={onMouseOut}
                                    >
                                        View/Edit
                                    </button>
                                    <button 
                                        className={styles.feeButton}
                                        onClick={() => {
                                            setSelectedStudentId(student._id);
                                            setShowFeeModal(true);
                                        }}
                                    >
                                        <DollarSign size={16} />
                                        Fees
                                    </button>
                                    {/* <ProfileCard student={student}/> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showFeeModal && selectedStudentId && (
                <FeeManagement 
                    studentId={selectedStudentId}
                    onClose={() => {
                        setShowFeeModal(false);
                        setSelectedStudentId(null);
                        fetchStudents(); // Refresh the list after fee changes
                    }}
                />
            )}
        </div>
    );
} 