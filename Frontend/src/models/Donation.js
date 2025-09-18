// Donation data model
export const DonationModel = {
  id: '',
  amount: 0,
  currency: 'USD',
  donorId: '',
  donorName: '',
  donorEmail: '',
  causeId: '',
  causeTitle: '',
  studentId: '',
  studentName: '',
  paymentMethod: '', // 'card', 'paypal', 'bank_transfer', 'cash'
  paymentStatus: 'pending', // 'pending', 'completed', 'failed', 'refunded'
  transactionId: '',
  isAnonymous: false,
  message: '',
  recurring: false,
  recurringFrequency: '', // 'monthly', 'yearly'
  createdAt: '',
  updatedAt: '',
};

// Donation validation schema
export const validateDonation = (donation) => {
  const errors = {};
  
  if (!donation.amount || donation.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!donation.paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  }
  
  if (!donation.donorEmail) {
    errors.donorEmail = 'Donor email is required';
  } else if (!/\S+@\S+\.\S+/.test(donation.donorEmail)) {
    errors.donorEmail = 'Email is invalid';
  }
  
  if (!donation.causeId && !donation.studentId) {
    errors.target = 'Please select a cause or student to donate to';
  }
  
  return errors;
};

// Donation helper functions
export const formatDonationAmount = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const getDonationStatusColor = (status) => {
  const colors = {
    pending: 'yellow',
    completed: 'green',
    failed: 'red',
    refunded: 'blue',
  };
  return colors[status] || 'gray';
};

export const isDonationCompleted = (donation) => {
  return donation.paymentStatus === 'completed';
};

export const isRecurringDonation = (donation) => {
  return donation.recurring && donation.recurringFrequency;
};
