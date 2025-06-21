#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 MineGuard Setup Script');
console.log('========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created! Please edit it with your actual values.');
  } else {
    console.log('❌ env.example not found. Creating basic .env file...');
    const basicEnv = `# Civic Authentication
VITE_CIVIC_APP_ID=your_civic_app_id_here
VITE_CIVIC_AUTH_SERVER_URL=https://auth.civic.com

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mineguard

# Server Configuration
PORT=5001

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
`;
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Basic .env file created! Please edit it with your actual values.');
  }
} else {
  console.log('✅ .env file already exists.');
}

// Create MongoDB data directory
const dataDir = path.join(__dirname, 'data', 'db');
if (!fs.existsSync(dataDir)) {
  console.log('📁 Creating MongoDB data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ MongoDB data directory created!');
} else {
  console.log('✅ MongoDB data directory already exists.');
}

// Check if MongoDB is installed
try {
  execSync('mongod --version', { stdio: 'ignore' });
  console.log('✅ MongoDB is installed.');
} catch (error) {
  console.log('⚠️  MongoDB is not installed or not in PATH.');
  console.log('💡 Please install MongoDB: https://docs.mongodb.com/manual/installation/');
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Edit the .env file with your actual values');
console.log('2. Run "npm run install:all" to install all dependencies');
console.log('3. Run "npm run dev:setup" to start the development environment');
console.log('\nFor more information, check the README.md file.'); 