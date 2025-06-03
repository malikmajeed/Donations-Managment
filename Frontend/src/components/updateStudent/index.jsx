import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { FaPhone, FaMapMarkerAlt, FaSchool, FaGraduationCap,FaPen,FaTrash,FaCamera } from 'react-icons/fa';
import { User, Crown, Heart } from 'lucide-react';

export default function GetStudentByID({ studentId }) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

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

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            // You can also store the file in state if needed for upload
            setStudent(prev => ({
                ...prev,
                profileFile: file
            }));
        }
    };

    const handleImageUpload = async () => {
        if (!student.profileFile) return;
        
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('profile', student.profileFile);
            
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/student/updateProfile/${studentId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // Refresh student data to get new profile URL
            fetchStudentDetails();
            setSelectedImage(null);
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const getImageUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `http://localhost:3000${url}`;
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!student) return <div className={styles.error}>Student not found</div>;

    return (
        <div className={styles.container}>
            <form className={styles.studentProfile}>
                <div className={styles.profileHeader}>
                    <div className={styles.profileHeaderContent}>
                        <div className={styles.profileImageContainer}>
                            <div className={styles.profileImage}>
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected profile" />
                                ) : student.profileUrl ? (
                                    <img 
                                        src={getImageUrl(student.profileUrl)} 
                                        alt={`${student.firstName}'s profile`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '';
                                            setStudent(prev => ({ ...prev, profileUrl: null }));
                                        }}
                                    />
                                ) : (
                                    <div className={styles.placeholderImage}>
                                        {student.firstName[0]}{student.lastName[0]}
                                    </div>
                                )}
                                <div className={styles.imageOverlay}>
                                    <label htmlFor="profileUpload" className={styles.uploadButton}>
                                        <FaCamera size={20} />
                                        <span>Change Photo</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="profileUpload"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={styles.hiddenInput}
                                    />
                                </div>
                            </div>
                            {selectedImage && (
                                <div className={styles.uploadActions}>
                                    <button 
                                        type="button" 
                                        onClick={handleImageUpload}
                                        disabled={isUploading}
                                        className={styles.saveImageButton}
                                    >
                                        {isUploading ? 'Uploading...' : 'Save Photo'}
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setStudent(prev => ({ ...prev, profileFile: null }));
                                        }}
                                        className={styles.cancelImageButton}
                                    >
                                        Cancel
                                    </button>
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
                            value={formatDateForInput(student.dateOfBirth)}
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
                        <div className={`${styles.infoGrid} ${styles.phoneAndAddress}`}>
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
                                <label><FaGraduationCap className={styles.icon} /> Grade</label>
                                <input 
                                    type="text"
                                    name="studentGrade"
                                    value={student.studentGrade}
                                    onChange={handleInputChange}
                                    className={styles.infoInput}
                                />
                            </div>
                            
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
                            {/* Buttons */}
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={() => window.history.back()}>
                            Cancel
                        </button>
                       
                        <button type="submit" className={styles.submitButton}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
