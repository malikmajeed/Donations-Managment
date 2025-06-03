import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { FaPhone, FaMapMarkerAlt, FaSchool, FaGraduationCap,FaPen,FaTrash } from 'react-icons/fa';
import { User, Crown, Heart } from 'lucide-react';

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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNameChange = (e) => {
        const fullName = e.target.value;
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setStudent(prevStudent => ({
            ...prevStudent,
            firstName,
            lastName
        }));
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!student) return <div className={styles.error}>Student not found</div>;

    return (
        <div className={styles.container}>
            <form className={styles.studentProfile}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileHeaderContent}>
                        <div className={styles.profileImage}>
                            <input type="file" />
                            {student.profileUrl ? (
                                <img src={`http://localhost:3000${student.profileUrl}`} alt={`${student.firstName}'s profile`} />
                            ) : (
                                <div className={styles.placeholderImage}>
                                    {student.firstName[0]}{student.lastName[0]}
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.nameAndSponsorshipStatus}>
                            <input 
                                type="text" 
                                value={`${student.firstName} ${student.lastName}`.trim()}
                                onChange={handleNameChange}
                                className={styles.nameInput}
                                placeholder="Enter full name"
                            />
                            <div className={styles.sponsorshipStatus}>
                                <select
                                    name="sponsorship"
                                    value={student.sponsorship ? 'true' : 'false'}
                                    onChange={handleInputChange}
                                    className={styles.sponsorshipSelect}
                                >
                                    <option value="true">Sponsored</option>
                                    <option value="false">Seeking Sponsor</option>
                                </select>
                            </div>
                        </div>
                       
                        <div className={styles.adminActions}>
                            <button className={styles.editButton}>
                                <FaPen size={15} />
                                Edit
                            </button>
                            <button className={styles.deleteButton}>
                                <FaTrash size={15} />
                                Delete
                            </button>
                        </div>    
                    </div>
                </div>

                <div className={styles.personalInfoRow}>
                    <div className={styles.infoColumn}>
                        <label>Father's Name</label>
                        <input 
                            type="text"
                            name="fatherName"
                            value={student.fatherName}
                            onChange={handleInputChange}
                            className={styles.infoInput}
                        />
                    </div>
                    <div className={styles.infoColumn}>
                        <label>Date of Birth</label>
                        <input 
                            type="date"
                            name="dateOfBirth"
                            value={student.dateOfBirth}
                            onChange={handleInputChange}
                            className={styles.infoInput}
                        />
                    </div>
                    <div className={styles.infoColumn}>
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={student.gender}
                            onChange={handleInputChange}
                            className={styles.infoInput}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.section}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label><FaPhone className={styles.icon} /> Phone Number</label>
                                <input 
                                    type="tel"
                                    name="phone"
                                    value={student.phone}
                                    onChange={handleInputChange}
                                    className={styles.infoInput}
                                />
                            </div>
                            <div className={styles.infoItem}>
                                <label><FaMapMarkerAlt className={styles.icon} /> Address</label>
                                <input 
                                    type="text"
                                    name="address"
                                    value={student.address}
                                    onChange={handleInputChange}
                                    className={styles.infoInput}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Educational Information</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label><FaSchool className={styles.icon} /> School</label>
                                <input 
                                    type="text"
                                    name="school"
                                    value={student.school}
                                    onChange={handleInputChange}
                                    className={styles.infoInput}
                                />
                            </div>
                            <div className={styles.infoItem}>
                                <label><FaGraduationCap className={styles.icon} /> Grade</label>
                                <input 
                                    type="text"
                                    name="studentGrade"
                                    value={student.studentGrade}
                                    onChange={handleInputChange}
                                    className={styles.infoInput}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Description</h2>
                        <div className={styles.introduction}>
                            <textarea
                                name="introduction"
                                value={student.introduction}
                                onChange={handleInputChange}
                                className={styles.introductionInput}
                            />
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
            </form>
        </div>
    );
}
