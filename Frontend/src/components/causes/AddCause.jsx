import { useState } from 'react';
import axios from 'axios';
import styles from './AddCause.module.css';

const CAUSE_TYPES = [
  'education',
  'empowerment',
  'foodDistribution',
  'mobileClinic',
  'waterWells'
];

export default function AddCause() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: '',
    budgetRequired: '',
    description: '',
    endDate: '',
    isUrgent: false,
    featureImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm(f => ({ ...f, [name]: files[0] }));
      if (files && files[0]) {
        setImagePreview(URL.createObjectURL(files[0]));
      } else {
        setImagePreview(null);
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          formData.append(key, value);
        }
      });
      const res = await axios.post('http://localhost:3000/causes/createCause', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Cause created successfully!');
      setForm({
        name: '', location: '', type: '', budgetRequired: '', description: '', endDate: '', isUrgent: false, featureImage: null
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create cause');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addCauseForm}>
      <h2 className={styles.heading}>Add New Donation Cause</h2>
      <div>
        <label className={styles.label}>Name<br/>
          <input name="name" value={form.name} onChange={handleChange} required className={styles.input} />
        </label>
      </div>
      <div>
        <label className={styles.label}>Location<br/>
          <input name="location" value={form.location} onChange={handleChange} required className={styles.input} />
        </label>
      </div>
      <div>
        <label className={styles.label}>Type<br/>
          <select name="type" value={form.type} onChange={handleChange} required className={styles.select}>
            <option value="">Select type</option>
            {CAUSE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <div>
        <label className={styles.label}>Budget Required<br/>
          <input name="budgetRequired" type="number" min="0" value={form.budgetRequired} onChange={handleChange} required className={styles.input} />
        </label>
      </div>
      <div>
        <label className={styles.label}>Description<br/>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={styles.textarea} />
        </label>
      </div>
      <div>
        <label className={styles.label}>End Date<br/>
          <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className={styles.input} />
        </label>
      </div>
      <div className={styles.checkboxRow}>
        <input name="isUrgent" type="checkbox" checked={form.isUrgent} onChange={handleChange} id="isUrgent" />
        <label htmlFor="isUrgent">Is Urgent?</label>
      </div>
      {imagePreview && (
        <div className={styles.imagePreviewBox}>
          <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
        </div>
      )}
      <div>
        <label className={styles.label}>Feature Image<br/>
          <input name="featureImage" type="file" accept="image/*" onChange={handleChange} className={styles.fileInput} />
        </label>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <button type="submit" disabled={loading} className={styles.macButton}>
        {loading ? 'Creating...' : 'Create Cause'}
      </button>
    </form>
  );
} 