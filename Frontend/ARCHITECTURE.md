# Project Architecture

This document outlines the clean, industry-standard architecture implemented for the Donations Management System.

## 📁 Directory Structure

```
src/
├── api/                     # API layer
│   ├── client.js           # Axios instance + interceptors
│   ├── endpoints.js        # All API endpoint URLs
│   └── services/           # Business-specific API calls
│       ├── authService.js
│       ├── userService.js
│       ├── studentService.js
│       ├── causeService.js
│       └── donationService.js
│
├── auth/                   # Authentication & guards
│   ├── AuthProvider.jsx    # Context for auth state
│   ├── PrivateRoute.jsx    # Wrapper for protected routes
│   └── useAuth.js          # Custom auth hook
│
├── components/             # Reusable UI components
│   ├── common/            # Buttons, inputs, modals
│   ├── layout/            # Header, Sidebar, Footer
│   └── feedback/          # Toasts, Alerts, Spinners
│
├── context/               # Global state/context providers
│   ├── ThemeContext.jsx   # Theme management
│   └── AppContext.jsx     # Global app state
│
├── hooks/                 # Custom hooks
│   ├── useFetch.js        # Data fetching hook
│   ├── useDebounce.js     # Debounce utility
│   └── useToggle.js       # Toggle state hook
│
├── models/                # Data models
│   ├── User.js           # User data model & validation
│   ├── Student.js        # Student data model & validation
│   ├── Cause.js          # Cause data model & validation
│   └── Donation.js       # Donation data model & validation
│
├── pages/                 # Page-level views
│   ├── Auth/             # Authentication pages
│   ├── Dashboard/        # Dashboard pages
│   ├── Profile/          # Profile pages
│   ├── Students/         # Student management
│   ├── Causes/           # Cause management
│   ├── Donations/        # Donation management
│   ├── Admin/            # Admin pages
│   └── NotFound/         # Error pages
│
├── routes/               # Route definitions
│   └── AppRoutes.jsx     # Main routing configuration
│
├── styles/               # Global styles
│   └── global.css        # Global CSS + Tailwind + Mantine
│
├── utils/                # Pure helper functions
│   ├── formatDate.js     # Date formatting utilities
│   ├── validators.js     # Form validation utilities
│   └── storage.js        # localStorage/sessionStorage helpers
│
├── App.jsx               # Main app component
└── main.jsx              # Entry point
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **API Layer**: Centralized HTTP client with interceptors
- **Authentication**: Dedicated auth system with context
- **Components**: Reusable UI components organized by purpose
- **Pages**: Route-level components for specific views
- **Utils**: Pure functions for common operations

### 2. **Centralized State Management**
- **AuthProvider**: Manages authentication state globally
- **AppProvider**: Handles global app state (loading, errors, modals)
- **ThemeProvider**: Manages theme switching

### 3. **API Management**
- **Single Axios Instance**: Configured with base URL and interceptors
- **Request/Response Interceptors**: Automatic token handling and error management
- **Service Layer**: Business logic separated from HTTP calls
- **Endpoint Constants**: All URLs centralized for easy maintenance

### 4. **Type Safety & Validation**
- **Data Models**: Clear structure for all entities
- **Validation Functions**: Reusable validation logic
- **Error Handling**: Consistent error management across the app

### 5. **Routing & Navigation**
- **Protected Routes**: Authentication-based route protection
- **Role-based Access**: Admin-only routes with role checking
- **Clean URLs**: RESTful URL structure

## 🔧 Key Features

### **API Client (`api/client.js`)**
```javascript
// Automatic token injection
// Request/response logging
// Error handling
// Timeout configuration
```

### **Authentication System**
```javascript
// Context-based auth state
// Automatic token refresh
// Protected route wrapper
// Role-based access control
```

### **Data Models**
```javascript
// Validation schemas
// Helper functions
// Type definitions
// Consistent data structure
```

### **Utility Functions**
```javascript
// Date formatting
// Form validation
// Storage management
// Common helpers
```

## 🚀 Benefits

1. **Maintainability**: Clear separation makes code easy to understand and modify
2. **Scalability**: Structure supports growth without refactoring
3. **Reusability**: Components and utilities can be easily reused
4. **Testability**: Pure functions and isolated components are easy to test
5. **Developer Experience**: Consistent patterns and clear organization
6. **Performance**: Optimized with proper state management and caching

## 📋 Next Steps

1. **Component Migration**: Move existing components to new structure
2. **API Integration**: Connect services to actual backend endpoints
3. **Testing**: Add unit and integration tests
4. **Documentation**: Add JSDoc comments and component documentation
5. **Performance**: Implement lazy loading and code splitting

## 🔄 Migration Guide

To migrate existing code to this structure:

1. **Move API calls** to appropriate service files
2. **Update imports** to use new paths
3. **Replace local state** with context providers where appropriate
4. **Use new utility functions** instead of inline logic
5. **Follow naming conventions** for consistency

This architecture provides a solid foundation for building a scalable, maintainable donation management system.
