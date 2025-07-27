const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Insta-IQ Pro - Admin User Creation\n');

// Function to prompt for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to create admin user
async function createAdminUser() {
  try {
    console.log('Please provide the following information for the admin user:\n');
    
    const name = await askQuestion('Admin Name: ');
    const email = await askQuestion('Admin Email: ');
    const password = await askQuestion('Admin Password (min 6 characters): ');
    
    // Basic validation
    if (!name || !email || !password) {
      console.log('❌ All fields are required!');
      rl.close();
      return;
    }
    
    if (password.length < 6) {
      console.log('❌ Password must be at least 6 characters long!');
      rl.close();
      return;
    }
    
    if (!email.includes('@')) {
      console.log('❌ Please enter a valid email address!');
      rl.close();
      return;
    }
    
    console.log('\n🔄 Creating admin user...');
    
    // Make API call to create admin user
    const response = await axios.post('http://localhost:5000/api/admin/create-admin', {
      name,
      email,
      password
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin User Details:');
    console.log(`   Name: ${response.data.user.name}`);
    console.log(`   Email: ${response.data.user.email}`);
    console.log(`   Role: ${response.data.user.role}`);
    console.log('\n🔑 You can now login with these credentials at: http://localhost:5173/login');
    
  } catch (error) {
    if (error.response) {
      console.log('❌ Error creating admin user:');
      console.log(`   ${error.response.data.message}`);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('❌ Cannot connect to backend server.');
      console.log('   Please make sure the backend is running on http://localhost:5000');
    } else {
      console.log('❌ An error occurred:', error.message);
    }
  } finally {
    rl.close();
  }
}

// Check if backend is running before starting
async function checkBackend() {
  try {
    await axios.get('http://localhost:5000/');
    console.log('✅ Backend server is running');
    createAdminUser();
  } catch (error) {
    console.log('❌ Backend server is not running');
    console.log('\n📝 Please start the backend server first:');
    console.log('   1. Navigate to the Backend directory: cd Backend');
    console.log('   2. Start the server: npm run dev');
    console.log('   3. Run this script again: node create-admin.js');
    rl.close();
  }
}

// Start the process
checkBackend(); 