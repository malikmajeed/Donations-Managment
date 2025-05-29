import { useState } from 'react';
import axios from 'axios';
import styles from './SignUp.module.css';

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                        placeholder='Enter First Name'
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
                        placeholder='Enter Last Name'
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
                        placeholder='Enter your email address'
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
                        placeholder='Enter your phone number'
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Create a strong password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Confirm your password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
                <p>Already have an account? <a href="">LogIn here...</a></p>
            </form>
        </div>
    );
}