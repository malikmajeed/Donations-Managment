import { useState } from 'react';
import axios from 'axios';
import styles from './SignIn.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.token);
                // Store user data if needed
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                alert('Login successful!');
                // Clear form
                setFormData({
                    email: '',
                    password: ''
                });
                // TODO: Redirect to dashboard or home page
            }
        } catch (error) {
            console.error('SignIn failed:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <h2>Sign in to your account</h2>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
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
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className={styles.eyeIcon}
                            onClick={togglePasswordVisibility}
                            disabled={isLoading}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p>Don't have an account? <a href="/signup">Create here...</a></p>
            </form>
        </div>
    );
}