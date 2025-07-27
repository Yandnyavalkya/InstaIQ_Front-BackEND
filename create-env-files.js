const fs = require('fs');
const path = require('path');

console.log('🔧 Creating environment files for Insta-IQ Pro...\n');

// Backend environment file content
const backendEnvContent = `# Server Configuration
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
`;

// Frontend environment file content
const frontendEnvContent = `# Backend API URL
VITE_BACKEND_URL=http://localhost:5000/api

# Frontend URL
VITE_FRONTEND_URL=http://localhost:5173

# App Configuration
VITE_APP_NAME=Insta-IQ Pro
VITE_APP_VERSION=1.0.0
`;

// Function to create environment file
function createEnvFile(filePath, content, description) {
  try {
    if (fs.existsSync(filePath)) {
      console.log(`⚠️  ${description} already exists. Skipping...`);
      return;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${description}`);
  } catch (error) {
    console.error(`❌ Error creating ${description}:`, error.message);
  }
}

// Create backend .env file
const backendEnvPath = path.join(__dirname, 'Backend', '.env');
createEnvFile(backendEnvPath, backendEnvContent, 'Backend .env file');

// Create frontend .env file
const frontendEnvPath = path.join(__dirname, 'instaiq-react', '.env');
createEnvFile(frontendEnvPath, frontendEnvContent, 'Frontend .env file');

console.log('\n🎉 Environment files created successfully!');
console.log('\n📝 Next steps:');
console.log('1. Update the environment variables with your actual values');
console.log('2. Install dependencies: npm run install-all');
console.log('3. Start the application: npm run dev');
console.log('\n💡 For detailed setup instructions, see setup.md'); 