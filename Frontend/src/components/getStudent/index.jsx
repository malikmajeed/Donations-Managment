import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { FaPhone, FaMapMarkerAlt, FaSchool, FaGraduationCap,FaPen,FaTrash } from 'react-icons/fa';
import { User, Crown, Heart } from 'lucide-react';
import DeleteStudent from '../deleteStudent';

export default function GetStudentByID({ studentId }) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClicked, setIsClicked]=useState(false)

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



    const handleDeleteAction = ()=>{
       
        console.log('delete function');
        console.log(isClicked);
       
       setIsClicked(!isClicked);
       console.log(isClicked);
       return <DeleteStudent studentID={studentId} isClicked={isClicked} />
       
    }

    
    const formatPhoneNumber = (phone) => {
        if (!phone) return 'N/A';
        const phoneStr = phone.toString();
        // Remove any non-digit characters
        const cleaned = phoneStr.replace(/\D/g, '');
        
        // Format: +countryCode (xxx) xxx-xxxx
        if (cleaned.length >= 10) {
            const countryCode = cleaned.slice(0, -10); // Get country code from the start
            const last10Digits = cleaned.slice(-10); // Get last 10 digits
            const areaCode = last10Digits.slice(0, 3);
            const middlePart = last10Digits.slice(3, 6);
            const lastPart = last10Digits.slice(6);
            
            return `+${countryCode} (${areaCode}) ${middlePart}-${lastPart}`;
        }
        return phoneStr;
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!student) return <div className={styles.error}>Student not found</div>;

    return (
        <div className={styles.container}>
            <div className={styles.studentProfile}>
                {/* Header */}
                <div className={styles.profileHeader}>
                    {/* Inner container */}
                    <div className={styles.profileHeaderContent}>
                        {/* profile image */}
                        <div className={styles.profileImage}>
                            {student.profileUrl ? (
                                <img src={`http://localhost:3000${student.profileUrl}`} alt={`${student.firstName}'s profile`} />
                            ) : (
                                <div className={styles.placeholderImage}>
                                    {student.firstName[0]}{student.lastName[0]}
                                </div>
                            )}
                            
                        </div>
                        {/* student name and sponsorship */}
                        <div className={styles.nameAndSponsorshipStatus}>
                            <h1>{student.firstName} {student.lastName}</h1>
                            <div className={styles.sponsorshipStatus}>
                                <span className={`${styles.statusBadge} ${student.sponsorship ? styles.sponsored : styles.notSponsored}`}>
                                    {student.sponsorship ? (
                                        <><Crown className={styles.iconSponsored} />Sponsored</>
                                    ) : (
                                        <><Heart className={styles.iconNotSponsored} />Seeking Sponsor</>
                                    )}
                                </span>
                            </div>
                        </div>
                        {/* buttons for update and delete user */}
                       
                        <div className={styles.adminActions}>
                                <button className={styles.editButton}>
                                    <FaPen size={15} />
                                    Edit
                                </button>
                                <button className={styles.deleteButton}
                                onClick={handleDeleteAction}>
                                    <FaTrash size={15} />
                                    Delete
                                </button>
                        </div>    
                       
                    </div>
                </div>


                {/* Body of student form */}

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
                                <label><FaPhone className={styles.icon} /> Phone Number</label>
                                <p>{formatPhoneNumber(student.phone)}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label><FaMapMarkerAlt className={styles.icon} /> Address</label>
                                <p>{student.address || 'N/A'}</p>
                            </div>
                        </div>
                                    </div>

                    <div className={styles.section}>
                        <h2>Educational Information</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label><FaSchool className={styles.icon} /> School</label>
                                <p>{student.school || 'N/A'}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <label><FaGraduationCap className={styles.icon} /> Grade</label>
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

                    {student.sponsorship && (
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

                    {!student.sponsorship && (
                        <div className={styles.sponsorButtonContainer}>
                            <button className={styles.sponsorButton}>
                                <Heart className={styles.sponsorButtonIcon} />
                                <span className={styles.sponsorButtonText}>
                                    Sponsor {student.lastName} Today
                                </span>
                            </button>
                            <p className={styles.sponsorButtonDescription}>
                                Help {student.firstName} {student.lastName} achieve {(student.gender=='male')?'his':'her'} dreams through education
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
