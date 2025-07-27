# Insta-IQ Pro - Complete Education Platform

A modern, full-stack education platform built with React.js frontend and Node.js backend, designed for career guidance and course management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Insta-Iq-pro_1-main
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   **Backend (.env file in Backend directory):**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/instaiq_db
   JWT_SECRET=instaiq_jwt_secret_key_2024_very_secure
   JWT_EXPIRES_IN=1h
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (.env file in instaiq-react directory):**
   ```env
   VITE_BACKEND_URL=http://localhost:5000/api
   VITE_FRONTEND_URL=http://localhost:5173
   ```

4. **Start both servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend server on `http://localhost:5173`

5. **Create an admin user** (optional)
   ```bash
   npm run create-admin
   ```
   Follow the prompts to create your first admin user.

## 📁 Project Structure

```
Insta-Iq-pro_1-main/
├── Backend/                 # Node.js/Express backend
│   ├── config/             # Database and JWT configuration
│   ├── controllers/        # API route handlers
│   ├── models/            # MongoDB schemas
│   ├── Routes/            # API routes
│   ├── middelwares/       # Authentication and upload middleware
│   ├── utils/             # Utility functions (Cloudinary)
│   └── index.js           # Main server file
├── instaiq-react/         # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   ├── config/        # API configuration
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── setup.md              # Detailed setup guide
├── start-servers.js      # Script to start both servers
└── package.json          # Root package.json with scripts
```

## 🔧 Features

### Frontend Features
- ✅ **User Authentication**: Login, register, and profile management
- ✅ **Course Management**: Browse, view details, and purchase courses
- ✅ **Event Management**: View and register for events
- ✅ **Admin Panel**: Complete admin dashboard for content management
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Modern UI**: Beautiful template-based design
- ✅ **State Management**: React Context for global state
- ✅ **API Integration**: Centralized API service with axios

### Backend Features
- ✅ **RESTful API**: Complete REST API with Express.js
- ✅ **Authentication**: JWT-based authentication system
- ✅ **Database**: MongoDB with Mongoose ODM
- ✅ **File Upload**: Cloudinary integration for image uploads
- ✅ **Security**: Password hashing, CORS, input validation
- ✅ **Error Handling**: Comprehensive error handling middleware
- ✅ **Admin Routes**: Protected admin-only endpoints

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/purchased-courses` - Get user's courses (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/purchase` - Purchase course (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Contact
- `POST /api/contact` - Submit contact form

### Admin
- `GET /api/admin/dashboard` - Admin dashboard (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/courses` - Get all courses (admin only)
- `GET /api/admin/events` - Get all events (admin only)

## 🎯 Usage Examples

### User Registration
```javascript
// Frontend
const response = await apiService.auth.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
});
```

### Course Purchase
```javascript
// Frontend
const response = await apiService.course.purchase(courseId);
```

### Admin Event Creation
```javascript
// Frontend
const response = await apiService.event.create({
  title: "Career Workshop",
  description: "Learn about career opportunities",
  date: "2024-02-15",
  location: "Online"
});
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configured for frontend-backend communication
- **Input Validation**: Server-side validation for all inputs
- **Protected Routes**: Role-based access control
- **Error Handling**: Secure error responses

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Update `MONGO_URI` to production database
3. Set secure `JWT_SECRET`
4. Configure proper CORS origins
5. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Set production `VITE_BACKEND_URL`
2. Build the application: `npm run build`
3. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database name

2. **CORS Errors**
   - Check `FRONTEND_URL` in backend `.env`
   - Ensure frontend is running on correct port

3. **JWT Token Issues**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings

4. **API Connection Issues**
   - Verify backend is running on port 5000
   - Check `VITE_BACKEND_URL` in frontend `.env`
   - Ensure both servers are running

### Development Tips
- Use `npm run dev` to start both servers simultaneously
- Check console logs for debugging
- Use browser dev tools for frontend debugging
- Use Postman for API testing

## 📝 Available Scripts

- `npm run install-all` - Install dependencies for both frontend and backend
- `npm run dev` - Start both development servers
- `npm run dev:backend` - Start only backend server
- `npm run dev:frontend` - Start only frontend server
- `npm run build` - Build frontend for production
- `npm start` - Start production backend server
- `npm run create-admin` - Create an admin user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
1. Check the `setup.md` file for detailed setup instructions
2. Review the troubleshooting section above
3. Check console logs for error messages
4. Ensure all environment variables are properly configured

---

**Insta-IQ Pro** - Empowering students with career guidance and education opportunities.
