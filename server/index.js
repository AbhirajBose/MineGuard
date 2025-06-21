const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// MongoDB Connection
const uri = 'mongodb+srv://ranaop:mineguard@cluster0.3t2jb0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log('Attempting to connect to MongoDB Atlas...');

const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("mineguard");
    console.log("✅ Successfully connected to MongoDB Atlas!");
    
    // Test the connection
    await db.admin().ping();
    console.log("✅ MongoDB connection is healthy!");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    console.log("💡 Please check your MongoDB Atlas connection string");
    process.exit(1);
  }
}

connectDB();

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'MineGuard Server is running!',
    mongodb: 'connected',
    environment: isProduction ? 'production' : 'development'
  });
});

// Get all logs
app.get('/api/logs', async (req, res) => {
  try {
    const logsCollection = db.collection('logs');
    const logs = await logsCollection.find({}).sort({ date: -1 }).toArray();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
});

// Add a new log
app.post('/api/logs', async (req, res) => {
  try {
    const { type, operator, note, filename } = req.body;

    if (!type || !operator) {
      return res.status(400).json({ message: 'Missing required fields: type and operator' });
    }

    const newLog = {
      type,
      operator,
      note: note || '',
      filename: filename || '',
      date: new Date(),
    };

    const logsCollection = db.collection('logs');
    const result = await logsCollection.insertOne(newLog);
    
    // Construct the document to be returned, including the new _id
    const insertedLog = {
      _id: result.insertedId,
      ...newLog
    };

    res.status(201).json(insertedLog);
  } catch (err) {
    console.error("Error in POST /api/logs:", err); // Added for better debugging
    res.status(500).json({ message: 'Failed to add log', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
  if (isProduction) {
    console.log(`Frontend served from: ${path.join(__dirname, '../dist')}`);
  }
});

// Catch-all handler for React Router in production
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

module.exports = app; 