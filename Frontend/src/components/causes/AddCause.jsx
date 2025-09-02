import React, { useState, useEffect } from 'react';

import { MdImage, MdUpload, MdCalendarToday, MdLocationOn, MdTextFields, MdWarning, MdAttachMoney, MdClose, MdCheckCircle } from 'react-icons/md';
import ENDPOINTS from '../../config/api.endpoints.js';
import axios from 'axios';


export default function AddCause({ type = '', onClose }) {
  const CAUSE_TYPES = [
    { value: 'education', label: 'Education' },
    { value: 'empowerment', label: 'Empowerment' },
    { value: 'foodDistribution', label: 'Food Distribution' },
    { value: 'mobileClinic', label: 'Mobile Clinic' },
    { value: 'waterWells', label: 'Water Wells' }
  ];
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    type: type || '',
    budgetRequired: '',
    endDate: '',
    isUrgent: false,
    featureImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (type) {
      setForm(prev => ({ ...prev, type }));
    }
  }, [type]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };


  const onCancel= ()=>{
    setForm({
      name: '',
      description: '',
      location: '',
      type: '',
      budgetRequired: '',
      endDate: '',
      isUrgent: false,
      featureImage: null
    });
  }
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
    if (!form.type) newErrors.type = 'Type is required';
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
    const token = localStorage.getItem('token');
    try {
      // Always use the correct type in the form data
      const submitForm = { ...form, type: type || form.type };
      const res = await axios.post(`${ENDPOINTS.CAUSES.CREATE}`, submitForm,
     { headers: {
        'Content-Type':'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }}
    );
    if(res.data.success){
        setShowSuccess(true);
      setForm({
        name: '',
        description: '',
        location: '',
          type: type || '',
        budgetRequired: '',
        endDate: '',
        isUrgent: false,
        featureImage: null
      });
        setImagePreview(null);
        return;
    }
    } catch (error) {
      console.log(error.message)
            return alert(error.message)
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-auto p-0" style={{ boxShadow: '0 4px 24px 0 rgba(35,83,182,0.10)' }}>
        {!showSuccess && (
          <div className="w-full px-8 py-6 flex items-center">
            <MdImage className="text-2xl text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-blue-600">Create New Cause</h2>
          </div>
        )}
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center p-12">
            <MdCheckCircle className="text-green-500 w-20 h-20 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Cause Added Successfully!</h3>
            <p className="text-gray-600 mb-8 text-center">Your new cause has been added. You can add another or return to the dashboard.</p>
            <div className="flex gap-4">
              <button
                className="py-[5px] px-6 rounded-lg font-semibold border border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => setShowSuccess(false)}
              >
                Add New
              </button>
              <button
                className="py-[5px] px-6 rounded-lg font-semibold border border-green-500 text-green-600 bg-green-50 hover:bg-green-100 transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={onClose}
              >
                Ok
              </button>
            </div>
        </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* First Row: Image + (Title & Location) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Image Upload */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <label className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <MdImage className="text-xl" /> Feature Image
              </label>
                <div className="w-28 h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full bg-gray-50">
          {imagePreview ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img src={imagePreview} alt="Preview" className="object-cover w-full h-full rounded-full" />
                      <button type="button" onClick={removeImage} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100">
                        <MdClose className="text-lg text-gray-600" />
                    </button>
                  </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      <MdUpload className="text-3xl text-blue-500 mb-1" />
                      <span className="text-xs text-gray-500">Click to upload</span>
                      <span className="text-[10px] text-gray-400">PNG, JPG up to 5MB</span>
                  </label>
                )}
                </div>
                {errors.featureImage && <span className="text-xs text-red-500 mt-1">{errors.featureImage}</span>}
              </div>
              {/* Title and Location stacked vertically */}
              <div className="col-span-2 flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="font-medium text-gray-700 flex items-center gap-2 mb-1">
                    <MdTextFields className="text-xl" /> Title *
                </label>
          <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.name ? 'border-red-400' : ''}`}
                  placeholder="Enter cause title"
                  maxLength={100}
                />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
              </div>
                <div>
                  <label htmlFor="location" className="font-medium text-gray-700 flex items-center gap-2 mb-1">
                    <MdLocationOn className="text-xl" /> Location *
        </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.location ? 'border-red-400' : ''}`}
                  placeholder="City, State or Country"
                />
                  {errors.location && <span className="text-xs text-red-500">{errors.location}</span>}
                </div>
              </div>
            </div>
            {/* Second Row: Type, Budget, Needed By */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="type" className="font-medium text-gray-700 flex items-center gap-2 mb-1">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={type || form.type}
                  onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.type ? 'border-red-400' : ''}`}
                  required
                  disabled={!!type}
                >
                  <option value="">Select type</option>
                  {CAUSE_TYPES.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.type && <span className="text-xs text-red-500">{errors.type}</span>}
              </div>
              <div>
                <label htmlFor="budgetRequired" className="font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <MdAttachMoney className="text-xl" /> Budget Required *
          </label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">$</span>
                <input
                  type="number"
                  id="budgetRequired"
                  name="budgetRequired"
                  value={form.budgetRequired}
                  onChange={handleInputChange}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.budgetRequired ? 'border-red-400' : ''}`}
                  placeholder="0"
                  min="1"
                  step="1"
                />
              </div>
                {errors.budgetRequired && <span className="text-xs text-red-500">{errors.budgetRequired}</span>}
            </div>
              <div>
                <label htmlFor="endDate" className="font-medium text-gray-700 flex items-center gap-2 mb-1">
                  <MdCalendarToday className="text-xl" /> Needed By *
          </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate}
                onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.endDate ? 'border-red-400' : ''}`}
                min={getTomorrowDate()}
              />
                {errors.endDate && <span className="text-xs text-red-500">{errors.endDate}</span>}
              </div>
            </div>
          {/* Description */}
            <div>
              <label htmlFor="description" className="font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[48px]"
              rows={3}
              required
            />
          </div>
            {/* Is Urgent */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="isUrgent"
                name="isUrgent"
                checked={form.isUrgent}
                onChange={handleInputChange}
                className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 mr-2"
              />
              <span className="flex items-center gap-1 text-gray-700">
                <MdWarning className="text-lg text-yellow-500" /> Mark as urgent
                <span className="text-xs text-gray-400 ml-2">This will highlight your cause and give it priority visibility</span>
              </span>
        </div>
          {/* Buttons */}
            <div className="flex gap-4 justify-end mt-2">
          <button
              type="button"
                className="py-[5px] px-6 rounded-lg font-semibold border border-red-500 text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
                className="py-[5px] px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-colors duration-200 flex items-center justify-center gap-2 shadow"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Cause"}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
} 