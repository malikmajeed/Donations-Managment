import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GetStudentByID.module.css';

export default function GetStudentByID({ studentId }) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (studentId) {
            fetchStudentDetails();
        }
    }, [studentId]);

    const fetchStudentDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/student/getStudentbyId/${studentId}`);
            setStudent(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch student details');
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!student) return <div className={styles.error}>Student not found</div>;

    return (
        <div className={styles.container}>
            <div className={styles.studentProfile}>
                <div className={styles.profileHeader}>
                    <div className={styles.headerColumn}>
                        <div className={styles.profileImage}>
                            {student.profileUrl ? (
                                <img src={student.profileUrl} alt={`${student.firstName}'s profile`} />
                            ) : (
                                <div className={styles.placeholderImage}>
                                    {student.firstName[0]}{student.lastName[0]}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className={`${styles.headerColumn} ${styles.nameAndSponsorshipStatus}`}>
                        <h1>{student.firstName} {student.lastName}</h1>
                        <div className={styles.sponsorshipStatus}>
                            <span className={`${styles.statusBadge} ${student.isSponsored ? styles.sponsored : styles.notSponsored}`}>
                                {student.isSponsored ? 'Sponsored' : 'Not Sponsored'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.personalInfoRow}>
                    <div className={styles.infoColumn}>
                        <label>Father's Name</label>
                        <span>{student.fatherName}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <label>Date of Birth</label>
                        <span>{formatDate(student.dateOfBirth)}</span>
                    </div>
                    <div className={styles.infoColumn}>
                        <label>Gender</label>
                        <span>{student.gender}</span>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.section}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>Phone Number</label>
                                <p>{student.phone || 'N/A'}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Address</label>
                                <p>{student.address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Educational Information</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label>School</label>
                                <p>{student.school || 'N/A'}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label>Grade</label>
                                <p>{student.studentGrade || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Description</h2>
                        <div className={styles.introduction}>
                            <p>{student.introduction || 'No description provided'}</p>
                        </div>
                    </div>

                    {student.isSponsored && (
                        <div className={styles.section}>
                            <h2>Sponsorship History</h2>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <label>Sponsor Name</label>
                                    <p>{student.sponsorName || 'N/A'}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <label>Start Date</label>
                                    <p>{student.sponsorshipStartDate ? formatDate(student.sponsorshipStartDate) : 'N/A'}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <label>End Date</label>
                                    <p>{student.sponsorshipEndDate ? formatDate(student.sponsorshipEndDate) : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!student.isSponsored && (
                        <div className={styles.sponsorButtonContainer}>
                            <button className={styles.sponsorButton}>
                                Sponsor Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
