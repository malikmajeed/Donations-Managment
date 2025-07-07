import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { MdCameraAlt, MdArrowBack, MdTextFields, MdLocationOn, MdCalendarToday, MdWarning, MdAttachMoney } from 'react-icons/md';
import styles from './UpdateCause.module.css';

const CAUSE_TYPES = [
  'education',
  'empowerment',
  'foodDistribution',
  'mobileClinic',
  'waterWells'
];

const TYPE_LABELS = {
  education: 'Education',
  empowerment: 'Empowerment',
  foodDistribution: 'Food Distribution',
  mobileClinic: 'Mobile Clinic',
  waterWells: 'Water Wells'
};

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

      <div className={styles.modal} style={{ boxShadow: '0 4px 24px 0 rgba(35,83,182,0.10)', margin: '2rem auto' }}>
        <div className={styles.header} style={{ borderBottom: 'none', marginBottom: 0 }}>
          <h2 className={styles.title}>Update Donation Cause</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* First Row: Image + (Title & Location) */}
          <div className={styles.formRowGrid}>
            {/* Feature Image Upload */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <MdCameraAlt className={styles.labelIcon} /> Feature Image
              </label>
              <div className={styles.imageUploadContainer}>
                {imagePreview ? (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                    <button type="button" onClick={() => { setForm(f => ({ ...f, featureImage: null })); setImagePreview(null); }} className={styles.removeImageButton}>
                      <MdCameraAlt className={styles.removeIcon} />
                    </button>
                  </div>
                ) : (
                  <label className={styles.uploadArea}>
                    <input type="file" accept="image/*" onChange={handleChange} className={styles.fileInput} />
                    <MdCameraAlt className={styles.uploadIcon} />
                    <span className={styles.uploadText}>Click to upload image</span>
                    <span className={styles.uploadSubtext}>PNG, JPG up to 5MB</span>
                  </label>
                )}
              </div>
              {error && error.toLowerCase().includes('image') && <span className={styles.error}>{error}</span>}
            </div>
            <div className={styles.formRowGridInner}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  <MdTextFields className={styles.labelIcon} /> Title *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`${styles.input} ${error && error.toLowerCase().includes('title') ? styles.inputError : ''}`}
                  placeholder="Enter cause title"
                  maxLength={100}
                  required
                />
                {error && error.toLowerCase().includes('title') && <span className={styles.error}>{error}</span>}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>
                  <MdLocationOn className={styles.labelIcon} /> Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className={`${styles.input} ${error && error.toLowerCase().includes('location') ? styles.inputError : ''}`}
                  placeholder="City, State or Country"
                  required
                />
                {error && error.toLowerCase().includes('location') && <span className={styles.error}>{error}</span>}
              </div>
            </div>
          </div>

          {/* Budget and End Date Row */}
          <div className={styles.formRow2}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="budgetRequired" className={styles.label}>
                <MdAttachMoney className={styles.labelIcon} /> Budget Required *
              </label>
              <div className={styles.currencyInput}>
                <span className={styles.currencySymbol}>$</span>
                <input
                  type="number"
                  id="budgetRequired"
                  name="budgetRequired"
                  value={form.budgetRequired}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.currencyField} ${error && error.toLowerCase().includes('budget') ? styles.inputError : ''}`}
                  placeholder="0"
                  min="1"
                  step="1"
                  required
                />
              </div>
              {error && error.toLowerCase().includes('budget') && <span className={styles.error}>{error}</span>}
            </div>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="endDate" className={styles.label}>
                <MdCalendarToday className={styles.labelIcon} /> End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className={`${styles.input} ${error && error.toLowerCase().includes('end date') ? styles.inputError : ''}`}
                required
              />
              {error && error.toLowerCase().includes('end date') && <span className={styles.error}>{error}</span>}
            </div>
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={3}
              required
            />
            {error && error.toLowerCase().includes('description') && <span className={styles.error}>{error}</span>}
          </div>

          {/* Is Urgent (below description, above buttons) */}
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel} htmlFor="isUrgent">
              <input
                type="checkbox"
                id="isUrgent"
                name="isUrgent"
                checked={form.isUrgent}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkboxCustom}>{form.isUrgent && <MdWarning className={styles.checkboxIcon} />}</span>
              <span className={styles.checkboxText}>
                Mark as urgent
                <span className={styles.checkboxSubtext}>
                  This will highlight your cause and give it priority visibility
                </span>
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate('/causes')}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Cause'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 