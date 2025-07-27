# Insta-IQ Pro Setup Guide

This guide will help you set up and connect the frontend and backend of the Insta-IQ Pro application.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the Backend directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/instaiq_db

# JWT Configuration
JWT_SECRET=instaiq_jwt_secret_key_2024_very_secure
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=instaiq_refresh_secret_key_2024
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (optional - for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
EMAIL_FROM=noreply@instaiq.com

# AWS S3 Configuration (optional - for file uploads)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=instaiq-bucket
```

### 4. Start Backend Server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd instaiq-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the instaiq-react directory with the following content:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:5000/api

# Frontend URL
VITE_FRONTEND_URL=http://localhost:5173

# App Configuration
VITE_APP_NAME=Insta-IQ Pro
VITE_APP_VERSION=1.0.0
```

### 4. Start Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Database Setup

### MongoDB Local Setup
1. Install MongoDB on your system
2. Start MongoDB service
3. Create a database named `instaiq_db`

### MongoDB Atlas Setup (Alternative)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `MONGO_URI` in the backend `.env` file with your Atlas connection string

## API Endpoints

The backend provides the following API endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/purchased-courses` - Get user's purchased courses (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/purchase` - Purchase a course (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Contact
- `POST /api/contact` - Submit contact form

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/courses` - Get all courses (admin only)
- `GET /api/admin/events` - Get all events (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

## Features

### Frontend Features
- ✅ User authentication (login/register)
- ✅ Course browsing and details
- ✅ Event management
- ✅ User profile management
- ✅ Contact form
- ✅ Admin panel
- ✅ Responsive design
- ✅ Modern UI with template styling

### Backend Features
- ✅ RESTful API
- ✅ JWT authentication
- ✅ User management
- ✅ Course management
- ✅ Event management
- ✅ Contact form handling
- ✅ Admin routes
- ✅ MongoDB integration
- ✅ File upload support (Cloudinary)
- ✅ Error handling
- ✅ CORS configuration

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify database name is correct

2. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend `.env`
   - Check that frontend is running on the correct port

3. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in backend `.env`
   - Check token expiration settings

4. **API Connection Issues**
   - Verify backend is running on port 5000
   - Check `VITE_BACKEND_URL` in frontend `.env`
   - Ensure both servers are running simultaneously

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reloading
2. **API Testing**: Use tools like Postman or Thunder Client to test API endpoints
3. **Database**: Use MongoDB Compass for database management
4. **Logs**: Check console logs for both frontend and backend for debugging

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in backend `.env`
2. Update `MONGO_URI` to production database
3. Set secure `JWT_SECRET`
4. Configure proper CORS origins
5. Set up proper environment variables for frontend
6. Build frontend with `npm run build`
7. Deploy to your preferred hosting platform

## Support

If you encounter any issues:
1. Check the console logs for both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB is running and accessible 