// Cause data model
export const CauseModel = {
  id: '',
  title: '',
  description: '',
  shortDescription: '',
  image: '',
  category: '', // 'education', 'health', 'food', 'water', 'emergency'
  type: '', // 'urgent', 'regular', 'ongoing'
  targetAmount: 0,
  currentAmount: 0,
  isActive: true,
  isUrgent: false,
  deadline: '',
  location: '',
  organizer: '',
  contactInfo: '',
  tags: [],
  createdAt: '',
  updatedAt: '',
};

// Cause validation schema
export const validateCause = (cause) => {
  const errors = {};
  
  if (!cause.title) {
    errors.title = 'Title is required';
  }
  
  if (!cause.description) {
    errors.description = 'Description is required';
  }
  
  if (!cause.category) {
    errors.category = 'Category is required';
  }
  
  if (!cause.type) {
    errors.type = 'Type is required';
  }
  
  if (!cause.targetAmount || cause.targetAmount <= 0) {
    errors.targetAmount = 'Target amount must be greater than 0';
  }
  
  if (!cause.location) {
    errors.location = 'Location is required';
  }
  
  return errors;
};

// Cause helper functions
export const getCauseProgress = (cause) => {
  if (cause.targetAmount === 0) return 0;
  return Math.min((cause.currentAmount / cause.targetAmount) * 100, 100);
};

export const getCauseStatus = (cause) => {
  if (!cause.isActive) return 'inactive';
  if (cause.isUrgent) return 'urgent';
  if (getCauseProgress(cause) >= 100) return 'completed';
  return 'active';
};

export const getCauseStatusColor = (status) => {
  const colors = {
    active: 'blue',
    urgent: 'red',
    completed: 'green',
    inactive: 'gray',
  };
  return colors[status] || 'gray';
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
