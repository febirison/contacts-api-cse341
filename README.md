Contacts API
   A RESTful API for managing contacts, built with Express and MongoDB Atlas.
Setup

Clone the repository:
git clone https://github.com/febirison/contacts-api-cse341.git
cd contacts-api-cse341


Install dependencies:
npm install


Create a .env file:
echo "MONGO_URI=mongodb+srv://<user>:<password>@contactscluster.9rtk9fa.mongodb.net/contactsDB?retryWrites=true&w=majority" > .env


Start the server:
npm start



API Routes

GET /contacts: Retrieve all contacts.
GET /contacts/:id: Retrieve a contact by ID.
POST /contacts: Create a new contact (requires name, email, phone).
PUT /contacts/:id: Update a contact by ID.
DELETE /contacts/:id: Delete a contact by ID.

Example Request
curl -X POST http://localhost:3000/contacts -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","phone":"123-456-7890"}'

