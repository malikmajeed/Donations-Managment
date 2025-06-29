import { useState } from 'react';
import axios from 'axios';
import styles from '../signIn/index.module.css';
import API_CONFIG from '../../config/api.config';





export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      // Replace with your actual endpoint
      const response = await axios.post(`${API_CONFIG.ENDPOINTS.USER.RESET}`, { email });
      console.log(response.data)
      if (response.data.success) {
        setSuccess('Password reset instructions sent to your email.');
        setEmail('');
      } else {
        setError(response.data.message || 'Failed to send reset instructions.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset instructions.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signinContainer}>
      <h2>Reset your password</h2>
      <form onSubmit={handleSubmit} className={styles.signinForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <p>
          Remembered your password?{' '}
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              selectForm(false);
            }}
          >
            Sign in here...
          </a>
        </p>
      </form>
    </div>
  );
} 