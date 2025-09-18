// Student data model
export const StudentModel = {
  id: '',
  firstName: '',
  lastName: '',
  age: 0,
  gender: '',
  grade: '',
  school: '',
  address: '',
  city: '',
  country: '',
  phone: '',
  email: '',
  image: '',
  description: '',
  monthlyFee: 0,
  isSponsored: false,
  sponsorId: null,
  sponsorName: '',
  category: '', // 'education', 'health', 'orphan', etc.
  status: 'active', // 'active', 'inactive', 'graduated'
  createdAt: '',
  updatedAt: '',
};

// Student validation schema
export const validateStudent = (student) => {
  const errors = {};
  
  if (!student.firstName) {
    errors.firstName = 'First name is required';
  }
  
  if (!student.lastName) {
    errors.lastName = 'Last name is required';
  }
  
  if (!student.age || student.age < 5 || student.age > 25) {
    errors.age = 'Age must be between 5 and 25';
  }
  
  if (!student.gender) {
    errors.gender = 'Gender is required';
  }
  
  if (!student.grade) {
    errors.grade = 'Grade is required';
  }
  
  if (!student.monthlyFee || student.monthlyFee <= 0) {
    errors.monthlyFee = 'Monthly fee must be greater than 0';
  }
  
  if (student.email && !/\S+@\S+\.\S+/.test(student.email)) {
    errors.email = 'Email is invalid';
  }
  
  return errors;
};

// Student helper functions
export const getStudentFullName = (student) => {
  return `${student.firstName} ${student.lastName}`.trim();
};

export const getStudentInitials = (student) => {
  const first = student.firstName?.charAt(0)?.toUpperCase() || '';
  const last = student.lastName?.charAt(0)?.toUpperCase() || '';
  return first + last;
};

export const isStudentSponsored = (student) => {
  return student.isSponsored && student.sponsorId;
};

export const getStudentStatusColor = (status) => {
  const colors = {
    active: 'green',
    inactive: 'red',
    graduated: 'blue',
  };
  return colors[status] || 'gray';
};
