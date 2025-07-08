import React, { useState } from 'react';
import styles from './AddCause.module.css';
import { MdImage, MdUpload, MdCalendarToday, MdLocationOn, MdTextFields, MdWarning, MdAttachMoney, MdClose } from 'react-icons/md';

export default function AddCause({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    budgetRequired: '',
    endDate: '',
    isUrgent: false,
    featureImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, featureImage: 'Image size must be less than 5MB' }));
        return;
      }
      setForm(prev => ({ ...prev, featureImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, featureImage: undefined }));
    }
  };

  const removeImage = () => {
    setForm(prev => ({ ...prev, featureImage: null }));
        setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.budgetRequired || isNaN(form.budgetRequired) || Number(form.budgetRequired) <= 0) newErrors.budgetRequired = 'Budget must be greater than 0';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    else {
      const selectedDate = new Date(form.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) newErrors.endDate = 'End date must be in the future';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (onSubmit) await onSubmit(form);
    } catch (error) {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.modal} style={{ boxShadow: '0 4px 24px 0 rgba(35,83,182,0.10)', margin: '2rem auto' }}>
        <div className={styles.header} style={{ borderBottom: 'none', marginBottom: 0 }}>
          <h2 className={styles.title}>Create New Cause</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* First Row: Image + (Title & Location) */}
          <div className={styles.formRowGrid}>
            {/* Feature Image Upload */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <MdImage className={styles.labelIcon} /> Feature Image
              </label>
              <div className={styles.imageUploadContainer}>
          {imagePreview ? (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                    <button type="button" onClick={removeImage} className={styles.removeImageButton}>
                      <MdClose className={styles.removeIcon} />
                    </button>
                  </div>
                ) : (
                  <label className={styles.uploadArea}>
                    <input type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput} />
                    <MdUpload className={styles.uploadIcon} />
                    <span className={styles.uploadText}>Click to upload image</span>
                    <span className={styles.uploadSubtext}>PNG, JPG up to 5MB</span>
                  </label>
                )}
              </div>
              {errors.featureImage && <span className={styles.error}>{errors.featureImage}</span>}
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
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="Enter cause title"
                  maxLength={100}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
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
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
                  placeholder="City, State or Country"
                />
                {errors.location && <span className={styles.error}>{errors.location}</span>}
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
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.currencyField} ${errors.budgetRequired ? styles.inputError : ''}`}
                  placeholder="0"
                  min="1"
                  step="1"
                />
              </div>
              {errors.budgetRequired && <span className={styles.error}>{errors.budgetRequired}</span>}
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
                onChange={handleInputChange}
                className={`${styles.input} ${errors.endDate ? styles.inputError : ''}`}
                min={getTomorrowDate()}
              />
              {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
            </div>
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={3}
              required
            />
          </div>

          {/* Is Urgent (below description, above buttons) */}
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel} htmlFor="isUrgent">
              <input
                type="checkbox"
                id="isUrgent"
                name="isUrgent"
                checked={form.isUrgent}
                onChange={handleInputChange}
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
              onClick={onCancel}
              disabled={!onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Cause"}
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
} 