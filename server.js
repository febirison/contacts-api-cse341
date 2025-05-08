const express = require('express');
  const { MongoClient } = require('mongodb');
  require('dotenv').config();

  const app = express();
  const port = 3000;
  const uri = process.env.MONGO_URI;

  // Middleware to parse JSON
  app.use(express.json());

  // MongoDB connection
  const client = new MongoClient(uri);

  async function connectToMongoDB() {
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
      // Optionally, verify database
      const db = client.db('contactsDB');
      await db.command({ ping: 1 });
      console.log('Pinged contactsDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  // Start server and connect to MongoDB
  async function startServer() {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }

  // Root route
  app.get('/', (req, res) => {
    res.send('Welcome to Contacts API');
  });

  // Optional: Test route to verify MongoDB (uncomment for testing)
  /*
  app.get('/contacts', async (req, res) => {
    try {
      const db = client.db('contactsDB');
      const collections = await db.listCollections().toArray();
      res.json({ message: 'MongoDB connected', collections });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  });
  */

  startServer();