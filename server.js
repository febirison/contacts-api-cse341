const express = require('express');
   const { MongoClient, ObjectId } = require('mongodb');
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

   // Get all contacts
   app.get('/contacts', async (req, res) => {
     try {
       const db = client.db('contactsDB');
       const contacts = await db.collection('contacts').find().toArray();
       res.json(contacts);
     } catch (error) {
       res.status(500).json({ error: 'Failed to fetch contacts' });
     }
   });

   // Get contact by ID
   app.get('/contacts/:id', async (req, res) => {
     try {
       const db = client.db('contactsDB');
       const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
       if (!contact) {
         return res.status(404).json({ error: 'Contact not found' });
       }
       res.json(contact);
     } catch (error) {
       res.status(500).json({ error: 'Failed to fetch contact' });
     }
   });

   // Create a contact
   app.post('/contacts', async (req, res) => {
     try {
       const db = client.db('contactsDB');
       const result = await db.collection('contacts').insertOne(req.body);
       res.status(201).json({ _id: result.insertedId, ...req.body });
     } catch (error) {
       res.status(500).json({ error: 'Failed to create contact' });
     }
   });

   // Update a contact
   app.put('/contacts/:id', async (req, res) => {
     try {
       const db = client.db('contactsDB');
       const result = await db.collection('contacts').updateOne(
         { _id: new ObjectId(req.params.id) },
         { $set: req.body }
       );
       if (result.matchedCount === 0) {
         return res.status(404).json({ error: 'Contact not found' });
       }
       res.json({ message: 'Contact updated' });
     } catch (error) {
       res.status(500).json({ error: 'Failed to update contact' });
     }
   });

   // Delete a contact
   app.delete('/contacts/:id', async (req, res) => {
     try {
       const db = client.db('contactsDB');
       const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
       if (result.deletedCount === 0) {
         return res.status(404).json({ error: 'Contact not found' });
       }
       res.json({ message: 'Contact deleted' });
     } catch (error) {
       res.status(500).json({ error: 'Failed to delete contact' });
     }
   });

   startServer();