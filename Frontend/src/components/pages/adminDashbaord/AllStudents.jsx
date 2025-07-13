import { useEffect, useState, useRef } from 'react';
import StudentCard from '../../Students/studentsCards/index.jsx';
import axios from 'axios';

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: [],
    gender: [],
    grade: [],
    dateOrder: 'descending'
  });

  // Filter dropdowns configuration
  const dropdowns = [
    {
      name: 'status',
      label: 'Status',
      items: [
        { value: 'sponsored', label: 'Sponsored' },
        { value: 'not-sponsored', label: 'Not Sponsored' },
        { value: 'pending', label: 'Pending' }
      ]
    },
    {
      name: 'gender',
      label: 'Gender',
      items: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'grade',
      label: 'Grade',
      items: [
        { value: '1', label: 'Grade 1' },
        { value: '2', label: 'Grade 2' },
        { value: '3', label: 'Grade 3' },
        { value: '4', label: 'Grade 4' },
        { value: '5', label: 'Grade 5' },
        { value: '6', label: 'Grade 6' },
        { value: '7', label: 'Grade 7' },
        { value: '8', label: 'Grade 8' },
        { value: '9', label: 'Grade 9' },
        { value: '10', label: 'Grade 10' },
        { value: '11', label: 'Grade 11' },
        { value: '12', label: 'Grade 12' }
      ]
    },
    {
      name: 'dateOrder',
      label: 'Date Order',
      items: [
        { value: 'descending', label: 'Newest First' },
        { value: 'ascending', label: 'Oldest First' }
      ]
    }
  ];

  const [openDropdowns, setOpenDropdowns] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const openDropdownNames = Object.keys(openDropdowns).filter(name => openDropdowns[name]);
      
      openDropdownNames.forEach(dropdownName => {
        const dropdownRef = dropdownRefs.current[dropdownName];
        if (dropdownRef && !dropdownRef.contains(event.target)) {
          setOpenDropdowns(prev => ({
            ...prev,
            [dropdownName]: false
          }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdowns]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/student/getAllStudents');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }));
  };

  const handleFilterChange = (dropdownName, value, isChecked) => {
    setFilters(prev => {
      const currentValue = prev[dropdownName];
      const isArray = Array.isArray(currentValue);
      
      if (isArray) {
        return {
          ...prev,
          [dropdownName]: isChecked 
            ? [...currentValue, value]
            : currentValue.filter(item => item !== value)
        };
      } else {
        // Handle single value dropdowns like dateOrder
        return {
          ...prev,
          [dropdownName]: value
        };
      }
    });
  };

  const handleSearchChange = (dropdownName, searchTerm) => {
    setSearchTerms(prev => ({
      ...prev,
      [dropdownName]: searchTerm
    }));
  };

  const getFilteredItems = (dropdown) => {
    const searchTerm = searchTerms[dropdown.name] || '';
    return dropdown.items.filter(item =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getSelectedLabel = (dropdown) => {
    const currentValue = filters[dropdown.name];
    if (Array.isArray(currentValue)) {
      const selectedCount = currentValue.length || 0;
      return selectedCount === 0 ? dropdown.label : `${dropdown.label}: ${selectedCount}`;
    } else {
      // For single value dropdowns
      if (!currentValue || currentValue === '') {
        return dropdown.label;
      }
      const item = dropdown.items.find(item => item.value === currentValue);
      return item ? item.label : dropdown.label;
    }
  };

  const removeFilter = (dropdownName, value) => {
    setFilters(prev => {
      const currentValue = prev[dropdownName];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [dropdownName]: currentValue.filter(item => item !== value)
        };
      } else {
        // For single value dropdowns, reset to empty string to allow removal
        return {
          ...prev,
          [dropdownName]: ''
        };
      }
    });
  };

  // Filter and sort students
  let filteredStudents = students.filter(student => {
    let match = true;
    
    // Status filter
    const statusFilters = Array.isArray(filters.status) ? filters.status : [];
    if (statusFilters.length > 0) {
      const isSponsored = student.sponsorship || student.sponsored;
      if (!statusFilters.includes(isSponsored ? 'sponsored' : 'not-sponsored')) {
        match = false;
      }
    }
    
    // Gender filter
    const genderFilters = Array.isArray(filters.gender) ? filters.gender : [];
    if (genderFilters.length > 0 && !genderFilters.includes(student.gender)) {
      match = false;
    }
    
    // Grade filter
    const gradeFilters = Array.isArray(filters.grade) ? filters.grade : [];
    if (gradeFilters.length > 0 && !gradeFilters.includes(student.studentGrade || student.studentClass)) {
      match = false;
    }
    
    return match;
  });

  // Sort by date added
  filteredStudents = filteredStudents.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    const dateOrder = filters.dateOrder || 'descending';
    return dateOrder === 'ascending' ? dateA - dateB : dateB - dateA;
  });

  if (loading) return <div className="text-center py-8 text-gray-600">Loading students...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">All Students</h2>
      
      {/* Multi-filter form */}
      <div className="w-full">
        {/* Filters container */}
        <div className="flex flex-wrap items-start gap-2 mb-4">
          {dropdowns.map(dropdown => (
            <div 
              key={dropdown.name} 
              className="relative w-full md:w-auto"
              ref={el => dropdownRefs.current[dropdown.name] = el}
            >
              {/* Custom dropdown button */}
              <button
                type="button"
                onClick={() => toggleDropdown(dropdown.name)}
                className="inline-flex justify-between w-full bg-white rounded md:w-48 px-2 py-1 text-base text-gray-500 bg-gray-50 border border-gray-300 appearance-none focus:outline-none ring-0 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 peer"
              >
                <span className="truncate mx-2">{getSelectedLabel(dropdown)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {openDropdowns[dropdown.name] && (
                <div className="absolute z-10 w-full mt-2 rounded bg-white ring-2 ring-blue-200 border border-blue-500">
                  {/* Search input with clear button */}
                  <div className="relative">
                    <input
                      value={searchTerms[dropdown.name] || ''}
                      onChange={(e) => handleSearchChange(dropdown.name, e.target.value)}
                      className="block w-full px-4 py-2 text-gray-800 rounded-t border-b focus:outline-none"
                      type="text"
                      placeholder={`Search for a ${dropdown.label.toLowerCase()}`}
                    />
                    {searchTerms[dropdown.name] && (
                      <button
                        type="button"
                        onClick={() => handleSearchChange(dropdown.name, '')}
                        className="absolute inset-y-0 right-2 px-2 flex items-center"
                      >
                        <svg className="h-4 w-4 text-gray-400 hover:text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Dropdown items */}
                  <div className="rounded-b max-h-60 overflow-y-auto">
                    {getFilteredItems(dropdown).map(item => {
                      const currentValue = filters[dropdown.name];
                      const isArray = Array.isArray(currentValue);
                      const isSelected = isArray 
                        ? currentValue.includes(item.value)
                        : currentValue === item.value;
                      
                      return (
                        <div
                          key={item.value}
                          onClick={() => handleFilterChange(dropdown.name, item.value, !isSelected)}
                          className={`block px-4 py-2 text-gray-700 hover:bg-blue-200 hover:text-blue-500 cursor-pointer bg-white w-full ${
                            isSelected ? 'bg-blue-200' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Apply button */}
          <button
            type="button"
            className="w-full md:w-auto inline-flex justify-center font-medium appearance-none border border-blue-700 bg-blue-700 rounded px-8 py-1 text-base text-white hover:bg-blue-800 ring-0 peer"
          >
            Apply Filters
          </button>
        </div>

        {/* Selected filters summary */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {dropdowns.map(dropdown => {
              const currentValue = filters[dropdown.name];
              if (Array.isArray(currentValue)) {
                return currentValue.map(value => {
                  const item = dropdown.items.find(item => item.value === value);
                  return item ? (
                    <span key={`${dropdown.name}-${value}`} className="inline-flex items-center px-3 py-1 rounded-full text-base bg-blue-100 text-blue-800">
                      <span>{item.label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFilter(dropdown.name, value);
                        }}
                        className="ml-2 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                      >
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  ) : null;
                });
              } else {
                // Handle single value dropdowns - only show if there's a value
                if (!currentValue || currentValue === '') {
                  return null;
                }
                const item = dropdown.items.find(item => item.value === currentValue);
                return item ? (
                  <span key={`${dropdown.name}-${currentValue}`} className="inline-flex items-center px-3 py-1 rounded-full text-base bg-blue-100 text-blue-800">
                    <span>{item.label}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFilter(dropdown.name, currentValue);
                      }}
                      className="ml-2 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                    >
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ) : null;
              }
            })}
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <StudentCard
            key={student._id || student.id}
            profileImage={student.profileUrl || student.profileImage}
            firstName={student.firstName}
            lastName={student.lastName}
            gender={student.gender}
            age={student.age}
            studentClass={student.studentClass}
            fee={student.monthlyFee || student.fee}
            sponsored={student.sponsorship || student.sponsored}
            adminView
            studentId={student._id || student.id}
          />
        ))}
      </div>
    </div>
  );
} 