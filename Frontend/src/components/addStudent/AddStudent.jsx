import { useState, useRef } from 'react';
import axios from 'axios';
import styles from './AddStudent.module.css';
import { FaUpload, FaTimes } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function AddStudent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        profileUrl: '',
        address: '',
        school: '',
        studentGrade: '',
        introduction: ''
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState({});
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (error[name]) {
            setError({
                ...error,
                [name]: ''
            });
        }
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData({
                    ...formData,
                    profileUrl: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        setFormData({
            ...formData,
            profileUrl: ''
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        let newError = {};
        
        if (!formData.firstName.trim()) {
            newError.firstName = 'First name is required';
        }
        if (!formData.fatherName.trim()) {
            newError.fatherName = 'Father name is required';
        }
        if (!formData.gender) {
            newError.gender = 'Gender is required';
        }
        if (!formData.dateOfBirth) {
            newError.dateOfBirth = 'Date of birth is required';
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const formDataToSend = new FormData();
            
            // Append all text fields
            Object.keys(formData).forEach(key => {
                if (key !== 'profileUrl') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Append the image file if it exists
            if (fileInputRef.current?.files[0]) {
                formDataToSend.append('profileImage', fileInputRef.current.files[0]);
            }

            const response = await axios.post('http://localhost:3000/students/addStudent', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                alert('Student added successfully!');
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    fatherName: '',
                    dateOfBirth: '',
                    gender: '',
                    phone: '',
                    profileUrl: '',
                    address: '',
                    school: '',
                    studentGrade: '',
                    introduction: ''
                });
                setPreviewImage(null);
                setError({});
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        } catch (error) {
            console.error('Error adding student:', error.response?.data || error.message);
            alert(error.response?.data || 'Failed to add student. Please try again.');
        }
    };

    const handleSaveDraft = () => {
        // TODO: Implement save draft functionality
        alert('Draft saved!');
    };

    return (
        <div className={styles.addStudentContainer}>
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit} className={styles.addStudentForm}>
                <div className={styles.imageSection}>
                    <div className={styles.imageUploadContainer}>
                        {previewImage ? (
                            <div className={styles.previewContainer}>
                                <img src={previewImage} alt="Preview" className={styles.previewImage} />
                                <button type="button" className={styles.removeImage} onClick={removeImage}>
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <div className={styles.uploadPlaceholder}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    ref={fileInputRef}
                                    className={styles.fileInput}
                                />
                                <FaUpload className={styles.uploadIcon} />
                                <span>Upload Photo</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.formFields}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {error.firstName && <span className={styles.error}>{error.firstName}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="fatherName">Father Name *</label>
                            <input
                                type="text"
                                id="fatherName"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                required
                            />
                            {error.fatherName && <span className={styles.error}>{error.fatherName}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="dateOfBirth">Date of Birth *</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {error.dateOfBirth && <span className={styles.error}>{error.dateOfBirth}</span>}
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Gender *</label>
                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>Male</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>Female</span>
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        checked={formData.gender === 'other'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>Other</span>
                                </label>
                            </div>
                            {error.gender && <span className={styles.error}>{error.gender}</span>}
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <PhoneInput
                                country={'pk'}
                                value={formData.phone}
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

                        <div className={styles.formGroup}>
                            <label htmlFor="school">School</label>
                            <input
                                type="text"
                                id="school"
                                name="school"
                                value={formData.school}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="studentGrade">Grade</label>
                            <input
                                type="text"
                                id="studentGrade"
                                name="studentGrade"
                                value={formData.studentGrade}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="introduction">Introduction</label>
                        <textarea
                            id="introduction"
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={() => window.history.back()}>
                            Cancel
                        </button>
                        <button type="button" className={styles.draftButton} onClick={handleSaveDraft}>
                            Save Draft
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Add Student
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
