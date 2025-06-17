import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { FaPhone, FaMapMarkerAlt, FaSchool, FaGraduationCap,FaPen,FaTrash,FaCamera } from 'react-icons/fa';
import { User, Crown, Heart } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import defaultAvatar from '/default-avatar.avif'

export default function GetStudentByID({ studentId }) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

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
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
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

    const handlePhoneChange = (value) => {
        setStudent(prev => ({
            ...prev,
            phone: value.toString()
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:3000/student/updateStudent/${studentId}`,
                {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    fatherName: student.fatherName,
                    dateOfBirth: student.dateOfBirth,
                    gender: student.gender,
                    phone: student.phone,
                    address: student.address,
                    school: student.school,
                    studentGrade: student.studentGrade,
                    introduction: student.introduction,
                    sponsorship: student.sponsorship
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                // Refresh student data
                await fetchStudentDetails();
                alert('Student updated successfully');
            }
        } catch (err) {
            console.error('Error updating student:', err);
            setSubmitError(err.response?.data?.message || 'Failed to update student');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!student) return <div className={styles.error}>Student not found</div>;

    return (
        <div className={styles.container}>
            <form className={styles.studentProfile} onSubmit={handleSubmit}>
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
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setStudent(prev => ({ ...prev, profileFile: null }));
                                        }}
                                        className={styles.cancelImageButton}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={handleImageUpload}
                                        disabled={isUploading}
                                        className={styles.saveImageButton}
                                    >
                                        {isUploading ? 'Uploading...' : 'Save'}
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.nameAndSponsorshipStatus}>
                            <div className={styles.nameInputs}>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    value={student.firstName}
                                    onChange={handleNameChange}
                                    className={styles.nameInput}
                                    placeholder="First Name"
                                />
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={handleNameChange}
                                    className={styles.nameInput}
                                    placeholder="Last Name"
                                />
                            </div>
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
                                <PhoneInput
                                    country={'pk'}
                                    value={student.phone ? student.phone.toString() : ''}
                                    onChange={handlePhoneChange}
                                    inputClass={styles.phoneInput}
                                    containerClass={styles.phoneInputContainer}
                                    buttonClass={styles.phoneButton}
                                    dropdownClass={styles.phoneDropdown}
                                    searchClass={styles.phoneSearch}
                                    enableSearch={true}
                                    searchPlaceholder="Search country..."
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
                        <button 
                            type="button" 
                            className={styles.cancelButton} 
                            onClick={() => window.history.back()}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                       
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {submitError && (
                    <div className={styles.error}>
                        {submitError}
                    </div>
                )}
            </form>
        </div>
    );
}
