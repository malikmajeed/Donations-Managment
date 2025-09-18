// Validation utilities
export const validators = {
  // Email validation
  email: (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  },

  // Password validation
  password: (value, minLength = 6) => {
    if (!value) return 'Password is required';
    if (value.length < minLength) return `Password must be at least ${minLength} characters`;
    return null;
  },

  // Confirm password validation
  confirmPassword: (value, password) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return null;
  },

  // Required field validation
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Phone number validation
  phone: (value) => {
    if (!value) return null; // Optional field
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  // URL validation
  url: (value) => {
    if (!value) return null; // Optional field
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  // Number validation
  number: (value, min = null, max = null) => {
    if (!value) return null; // Optional field
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (min !== null && num < min) return `Value must be at least ${min}`;
    if (max !== null && num > max) return `Value must be at most ${max}`;
    return null;
  },

  // Age validation
  age: (value, minAge = 0, maxAge = 120) => {
    if (!value) return 'Age is required';
    const age = Number(value);
    if (isNaN(age)) return 'Please enter a valid age';
    if (age < minAge) return `Age must be at least ${minAge}`;
    if (age > maxAge) return `Age must be at most ${maxAge}`;
    return null;
  },

  // File validation
  file: (file, maxSize = 5 * 1024 * 1024, allowedTypes = []) => {
    if (!file) return null; // Optional field
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
    }
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type must be one of: ${allowedTypes.join(', ')}`;
    }
    return null;
  },
};

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = data[field];
    
    for (const rule of fieldRules) {
      const error = rule(value, data);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return errors;
};

// Common validation rules
export const commonRules = {
  email: [validators.required, validators.email],
  password: [validators.required, validators.password],
  confirmPassword: [validators.required, validators.confirmPassword],
  firstName: [validators.required],
  lastName: [validators.required],
  phone: [validators.phone],
  age: [validators.required, validators.age],
};
