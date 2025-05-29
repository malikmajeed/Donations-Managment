import { useState } from 'react';
import axios from 'axios';
import styles from './SignUp.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

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
            }
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h2>Create an Account</h2>
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
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
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
                </div>

                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
                <p>Already have an account? <a href="">LogIn here...</a></p>
            </form>
        </div>
    );
}