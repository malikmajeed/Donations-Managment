import { useState } from 'react';
import axios from 'axios';
import styles from './SignUp.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'donor'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});

    const validateForm = () => {
        let newError = {};
        
        // First Name validation
        if (!formData.fName.trim()) {
            newError.fName = 'First name is required';
        }

        // Last Name validation
        if (!formData.lName.trim()) {
            newError.lName = 'Last name is required';
        }

        // Email validation
        if (!formData.email.trim()) {
            newError.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newError.email = 'Email is invalid';
        }

        // Phone validation (optional but if provided, validate format)
        if (formData.phone && formData.phone.length < 8) {
            newError.phone = 'Please enter a valid phone number';
        }

        // Password validation
        if (!formData.password) {
            newError.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newError.password = 'Password must be at least 6 characters';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newError.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newError.confirmPassword = 'Passwords do not match';
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
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
        if (error.phone) {
            setError({
                ...error,
                phone: ''
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/user/signup', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                alert('Account Created Successfully!');
                console.log('Signup successful:', response.data);
                setFormData({
                    fName: '',
                    lName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    role: 'donor'
                });
                setError({});
            }
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h2>Create your account</h2>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="fName">First Name *</label>
                    <input
                        type="text"
                        id="fName"
                        name="fName"
                        value={formData.fName}
                        onChange={handleChange}
                        required
                    />
                    {error.fName && <span className={styles.error}>{error.fName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lName">Last Name *</label>
                    <input
                        type="text"
                        id="lName"
                        name="lName"
                        value={formData.lName}
                        onChange={handleChange}
                        required
                    />
                    {error.lName && <span className={styles.error}>{error.lName}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {error.email && <span className={styles.error}>{error.email}</span>}
                </div>

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
                        inputProps={{
                            name: 'phone',
                            id: 'phone',
                            required: false
                        }}
                    />
                    {error.phone && <span className={styles.error}>{error.phone}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password *</label>
                    <div className={styles.passwordInputContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error.password && <span className={styles.error}>{error.password}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <div className={styles.passwordInputContainer}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error.confirmPassword && <span className={styles.error}>{error.confirmPassword}</span>}
                </div>

                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
                <p>Already have an account? <a href="/signin">LogIn here...</a></p>
            </form>
        </div>
    );
}