import { useState } from 'react';
import GetAllStudents from '../getAllStudents';
import GetStudentByID from '../getStudent';
import styles from './index.module.css';

export default function StudentManagement() {
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showStudentDetails, setShowStudentDetails] = useState(false);

    const handleViewStudent = (studentId) => {
        setSelectedStudentId(studentId);
        setShowStudentDetails(true);
    };

    const handleBackToList = () => {
        setShowStudentDetails(false);
        setSelectedStudentId(null);
    };

    return (
        <div className={styles.container}>
            {showStudentDetails ? (
                <div>
                    <button 
                        className={styles.backButton}
                        onClick={handleBackToList}
                    >
                        ← Back to List
                    </button>
                    <GetStudentByID studentId={selectedStudentId} />
                </div>
            ) : (
                <GetAllStudents onViewStudent={handleViewStudent} />
            )}
        </div>
    );
} 