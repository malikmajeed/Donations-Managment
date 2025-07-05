import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { MdCameraAlt, MdArrowBack } from 'react-icons/md';
import styles from './UpdateCause.module.css';

const CAUSE_TYPES = [
  'education',
  'empowerment',
  'foodDistribution',
  'mobileClinic',
  'waterWells'
];

export default function UpdateCause() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: '',
    budgetRequired: '',
    description: '',
    endDate: '',
    isUrgent: false,
    status: 'active',
    featureImage: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  useEffect(() => {
    fetchCause();
  }, [id]);

  const fetchCause = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_CONFIG.ENDPOINTS.CAUSES.BY_ID(id));
      const cause = response.data.cause || response.data;
      
      setForm({
        name: cause.name || '',
        location: cause.location || '',
        type: cause.type || '',
        budgetRequired: cause.budgetRequired || '',
        description: cause.description || '',
        endDate: cause.endDate ? new Date(cause.endDate).toISOString().split('T')[0] : '',
        isUrgent: cause.isUrgent || false,
        status: cause.status || 'active',
        featureImage: null
      });
      
      if (cause.featureImage) {
        setOriginalImage(cause.featureImage);
        setImagePreview(`${API_CONFIG.BASE_URL}/${cause.featureImage}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cause details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm(f => ({ ...f, [name]: files[0] }));
      if (files && files[0]) {
        setImagePreview(URL.createObjectURL(files[0]));
      } else {
        setImagePreview(originalImage ? `${API_CONFIG.BASE_URL}/${originalImage}` : null);
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          formData.append(key, value);
        }
      });
      
      await axios.put(`${API_CONFIG.ENDPOINTS.CAUSES.UPDATE(id)}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccess('Cause updated successfully!');
      setTimeout(() => {
        navigate('/causes');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update cause');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading cause details...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => navigate('/causes')}
          className={styles.backButton}
        >
          <MdArrowBack />
          Back to Causes
        </button>
        <h1 className={styles.title}>Update Donation Cause</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.updateForm}>
        <div className={styles.imageSection}>
          <label htmlFor="featureImageUpload" className={styles.imageUploadArea}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <MdCameraAlt className={styles.cameraIcon} />
                <span>Upload Image</span>
              </div>
            )}
            <input
              id="featureImageUpload"
              name="featureImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className={styles.hiddenInput}
            />
          </label>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formCol}>
            <label className={styles.label}>
              Name
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                className={styles.input} 
              />
            </label>
            
            <label className={styles.label}>
              Type
              <select 
                name="type" 
                value={form.type} 
                onChange={handleChange} 
                required 
                className={styles.select}
              >
                <option value="">Select type</option>
                {CAUSE_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            
            <label className={styles.label}>
              Status
              <select 
                name="status" 
                value={form.status} 
                onChange={handleChange} 
                className={styles.select}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
            </label>
            
            <label className={styles.label}>
              Description
              <textarea 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                rows={4} 
                className={styles.textarea} 
              />
            </label>
          </div>
          
          <div className={styles.formCol}>
            <label className={styles.label}>
              Location
              <input 
                name="location" 
                value={form.location} 
                onChange={handleChange} 
                className={styles.input} 
              />
            </label>
            
            <label className={styles.label}>
              Budget Required
              <input 
                name="budgetRequired" 
                type="number" 
                min="0" 
                value={form.budgetRequired} 
                onChange={handleChange} 
                required 
                className={styles.input} 
              />
            </label>
            
            <label className={styles.label}>
              End Date
              <input 
                name="endDate" 
                type="date" 
                value={form.endDate} 
                onChange={handleChange} 
                className={styles.input} 
              />
            </label>
            
            <div className={styles.checkboxRow}>
              <input 
                name="isUrgent" 
                type="checkbox" 
                checked={form.isUrgent} 
                onChange={handleChange} 
                id="isUrgent" 
              />
              <label htmlFor="isUrgent">Is Urgent?</label>
            </div>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={() => navigate('/causes')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={submitting} 
            className={styles.updateButton}
          >
            {submitting ? 'Updating...' : 'Update Cause'}
          </button>
        </div>
      </form>
    </div>
  );
} 