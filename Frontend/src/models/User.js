// User data model
export const UserModel = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  avatar: '',
  role: 'user', // 'user', 'admin', 'moderator'
  isEmailVerified: false,
  createdAt: '',
  updatedAt: '',
};

// User validation schema
export const validateUser = (user) => {
  const errors = {};
  
  if (!user.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!user.firstName) {
    errors.firstName = 'First name is required';
  }
  
  if (!user.lastName) {
    errors.lastName = 'Last name is required';
  }
  
  if (user.phone && user.phone.length < 8) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return errors;
};

// User helper functions
export const getUserFullName = (user) => {
  return `${user.firstName} ${user.lastName}`.trim();
};

export const getUserInitials = (user) => {
  const first = user.firstName?.charAt(0)?.toUpperCase() || '';
  const last = user.lastName?.charAt(0)?.toUpperCase() || '';
  return first + last;
};

export const isAdmin = (user) => {
  return user?.role === 'admin';
};

export const isModerator = (user) => {
  return user?.role === 'moderator' || isAdmin(user);
};
