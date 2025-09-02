# 🎓 Ansar Foundation Donations Management System

A comprehensive web application for managing donations, students, and users for the Ansar Foundation. Built with modern technologies to provide a seamless experience for administrators and donors.

## 🌟 Features

### User Management
- Secure user authentication and authorization
- Role-based access control (Admin, Donor)
- Profile management with image upload
- Password reset functionality
- Session management

### Student Management
- Complete student profile management
- Document upload and management
- Academic progress tracking
- Financial aid management
- Student status tracking

### Donation Management
- Multiple donation types (One-time, Monthly, Yearly)
- Secure payment processing
- Donation history tracking
- Receipt generation
- Donation analytics

### Dashboard
- Interactive data visualization
- Real-time statistics
- User activity monitoring
- Financial reports
- Student progress tracking

## 🛠️ Technology Stack

### Frontend
- React.js
- Material-UI (MUI)
- Redux Toolkit for state management
- React Router for navigation
- Axios for API requests
- Chart.js for data visualization

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Bcrypt for password hashing
- Nodemailer for email notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malikmajeed/Donations_Managment_Ansar_foundation.git
cd Donations_Managment_Ansar_foundation
```

2. Install Frontend Dependencies
```bash
cd Frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../Backend
npm install
```

4. Environment Setup
Create `.env` files in both Frontend and Backend directories:

Backend `.env`:
```
PORT=3000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:3000
```

5. Start the Development Servers

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

## 📁 Project Structure

```
Donations_Managment_Ansar_foundation/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── Backend/
    ├── Controllers/
    ├── Models/
    ├── Routes/
    ├── Middlewares/
    ├── uploads/
    └── server.js
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- File upload security
- CORS configuration
- Rate limiting

## 📊 API Documentation

### Authentication Endpoints
- POST `/user/register` - Register new user
- POST `/user/login` - User login
- POST `/user/forgot-password` - Request password reset
- POST `/user/reset-password` - Reset password

### Student Endpoints
- GET `/student/` - Get all students
- POST `/student/` - Add new student
- PUT `/student/:id` - Update student
- DELETE `/student/:id` - Delete student

### Donation Endpoints
- GET `/donation/` - Get all donations
- POST `/donation/` - Create new donation
- GET `/donation/:id` - Get donation details
- PUT `/donation/:id` - Update donation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Malik Majeed** - *Initial work* - [malikmajeed](https://github.com/malikmajeed)

## 🙏 Acknowledgments

- Ansar Foundation for their support and requirements
- All youtube community who helped me understand Coding core concepts. 
- Open source community for the amazing tools and libraries

## 📞 Support

Reach out to me, malikmajeed@gmail.com

---

Made with ❤️ for Ansar Foundation 
