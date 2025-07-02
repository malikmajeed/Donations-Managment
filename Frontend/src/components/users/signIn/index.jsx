import { useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignIn({selectForm}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState({});

    const validateForm = (e)=>{
        let newError= {};

        if(!formData.email){
            newError.email = 'Email is required';

        }
        if(!formData.password){
            newError.password='Password is required'
        }

        return newError;
    }



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
        const validationErrors = validateForm();
        setError(validationErrors);
    
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
    
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Full response:', response);
            console.log('Response data:', response.data);
            
            if (response.data.success) {
                // Store the token
                localStorage.setItem('token', response.data.token);
                
                // Store user data - using the correct structure from response
                const userData = {
                    id: response.data.user._id,
                    role: response.data.user.role,
                };
                
                console.log('User data before storage:', userData);
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Verify storage
                const storedData = localStorage.getItem('userData');
                console.log('Stored user data:', JSON.parse(storedData));
                
                alert('Login successful!');
                
                // Clear form
                setFormData({
                    email: '',
                    password: ''
                });
                // TODO: Redirect to dashboard or home page
            } else {
                console.error('Login response missing success flag:', response.data);
                alert('Login failed: Invalid response from server');
            }
        } catch (error) {
            console.error('SignIn failed:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            alert(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.signinContainer}>
            <h2>Sign in to your account</h2>
            <form onSubmit={handleSubmit} className={styles.signinForm}>
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
                <p>Don't have an account? <a 
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault();
                        selectForm(true);
                    }}
                >Create here...</a></p>
            </form>
        </div>
    );
}