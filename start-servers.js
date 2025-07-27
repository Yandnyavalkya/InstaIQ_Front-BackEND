const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Insta-IQ Pro Application...\n');

// Function to start a server
function startServer(command, args, cwd, name) {
  console.log(`📡 Starting ${name}...`);
  
  const child = spawn(command, args, {
    cwd: path.resolve(cwd),
    stdio: 'pipe',
    shell: true
  });

  child.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`[${name} ERROR] ${data.toString().trim()}`);
  });

  child.on('close', (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  return child;
}

// Start backend server
const backend = startServer('npm', ['run', 'dev'], './Backend', 'Backend');

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  const frontend = startServer('npm', ['run', 'dev'], './instaiq-react', 'Frontend');
  
  console.log('\n✅ Both servers are starting...');
  console.log('📱 Frontend will be available at: http://localhost:5173');
  console.log('🔧 Backend API will be available at: http://localhost:5000');
  console.log('\n💡 Press Ctrl+C to stop both servers\n');
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}, 2000); 