// Description: This module handles MongoDB operations for the contacts collection.
//        const { name, email, phone } = req.body;
const express = require('express');
const contactRoutes = require('./routes/contacts');
const { connectToMongoDB } = require('./models/contactModel');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Contacts API');
});

// Connect routes
app.use('/contacts', contactRoutes);

// Start server and connect to MongoDB
async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();