import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
// import { useAuth } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../services/api';
// import defaultAvatar from '/default-avatar.avif';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const UpdateProfile = ({ isOpen, onClose, onUpdate, userId }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        profileFile: null
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [existingProfileUrl, setExistingProfileUrl] = useState(null);

    useEffect(() => {
        if (isOpen && userId) {
            fetchUserData();
        }
    }, [isOpen, userId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                const userData = response.data.user;
                setFormData({
                    firstName: userData.fName || '',
                    lastName: userData.lName || '',
                    email: userData.email || '',
                    phone: userData.phone ? userData.phone.toString() : '',
                    address: userData.address || '',
                    gender: userData.gender || '',
                    profileFile: null
                });
                if (userData.profileUrl) {
                    setExistingProfileUrl(userData.profileUrl.startsWith('/') 
                        ? `http://localhost:3000${userData.profileUrl}`
                        : userData.profileUrl
                    );
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({
            ...prev,
            phone: value.toString()
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profileFile: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'profileFile' && formData[key]) {
                    formDataToSend.append('profile', formData[key]);
                } else if (key !== 'profileFile') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const updatedUser = await updateUserProfile(userId, formDataToSend);
            onUpdate(updatedUser);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Update Profile</h2>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.profileNameRow}>
                        <div className={styles.profileImageSection}>
                            <div className={styles.profileImageContainer}>
                                <img
                                    src={selectedImage || formData.profileImage || '/default-avatar.png'}
                                    alt="Profile"
                                    className={styles.profileImage}
                                />
                                <div className={styles.imageOverlay}>
                                    <label className={styles.uploadButton}>
                                        <FaCamera />
                                        {/* <span>Change Photo</span> */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className={styles.hiddenInput}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>

                    <div className={styles.genderPhoneEmailRow}>
                        <div className={`${styles.formGroup} ${styles.genderGroup}`}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                value={formData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <PhoneInput
                                country={'pk'}
                                value={formData.phone}
                                onChange={(value) => handleChange('phone', value)}
                                inputClass={styles.phoneInput}
                                buttonClass={styles.phoneButton}
                                dropdownClass={styles.phoneDropdown}
                                searchClass={styles.phoneSearch}
                                containerClass={styles.phoneInputContainer}
                                inputProps={{
                                    id: 'phone',
                                    placeholder: 'Enter phone number'
                                }}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.buttonGroup}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile; 