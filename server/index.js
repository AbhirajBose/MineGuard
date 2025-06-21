const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Error: MONGODB_URI is not defined. Please check your server/.env file.');
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("mineguard"); // You can name your database here
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

connectDB();

// API Routes
app.get('/', (req, res) => {
  res.send('MineGuard Server is running!');
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
});

module.exports = app; 