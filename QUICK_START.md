# 🚀 Quick Start Guide - Insta-IQ Pro

Get your Insta-IQ Pro application up and running in minutes!

## ⚡ Super Quick Setup (3 Steps)

### Step 1: Setup Environment
```bash
npm run setup
```

### Step 2: Install Dependencies
```bash
npm run install-all
```

### Step 3: Start Application
```bash
npm run dev
```

That's it! 🎉 Your application will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔧 What You Need

### Prerequisites
- ✅ Node.js (v16 or higher)
- ✅ MongoDB (local or Atlas)
- ✅ npm or yarn

### MongoDB Setup
**Option 1: Local MongoDB**
1. Install MongoDB on your system
2. Start MongoDB service
3. Create database: `instaiq_db`

**Option 2: MongoDB Atlas (Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `MONGO_URI` in `Backend/.env`

## 📱 Test the Application

### 1. Register a New User
- Go to http://localhost:5173/register
- Create an account

### 2. Browse Courses
- Visit http://localhost:5173/courses
- View available courses

### 3. Admin Access
- Create an admin user: `npm run create-admin`
- Login with admin credentials
- Access admin panel at http://localhost:5173/admin

## 🛠️ Available Commands

```bash
# Setup environment files
npm run setup

# Install all dependencies
npm run install-all

# Start both servers
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Build for production
npm run build

# Create admin user
npm run create-admin

## 🐛 Common Issues & Solutions

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check connection string in `Backend/.env`
- For Atlas: Use connection string with username/password

### "CORS error"
- Verify `FRONTEND_URL=http://localhost:5173` in `Backend/.env`
- Ensure both servers are running

### "Module not found"
- Run `npm run install-all` to install all dependencies

### "Port already in use"
- Change port in `Backend/.env` (PORT=5001)
- Update `VITE_BACKEND_URL` in frontend `.env`

## 📞 Need Help?

1. Check the detailed `setup.md` file
2. Review the main `README.md`
3. Check console logs for error messages
4. Ensure all environment variables are set

## 🎯 Next Steps

After getting the app running:
1. Explore the admin panel
2. Add some courses and events
3. Test user registration and login
4. Customize the content and styling
5. Deploy to production

---

**Happy Coding! 🚀** 