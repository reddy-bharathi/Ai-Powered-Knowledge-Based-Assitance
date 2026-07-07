# AI-Powered Knowledge Base Assistant

## Project Overview

AI-Powered Knowledge Base Assistant is a full stack web application that allows authenticated users to upload documents and ask AI-powered questions based on the document contents.

The application supports PDF, TXT, and Markdown files. Uploaded documents are processed and stored, allowing users to interact with them through an AI chatbot. Previous conversations are saved for future reference.

The application was built following modern full stack development practices with clean architecture, reusable components, JWT authentication, REST APIs, and MongoDB.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

### Document Management

- Upload PDF files
- Upload TXT files
- Upload Markdown files
- Document metadata storage
- Delete documents
- Document preview

### AI Assistant

- Ask questions about uploaded documents
- AI-generated answers using Gemini API
- Context-aware responses

### Chat History

- Stores every conversation
- Search previous chats
- View timestamps
- Document-wise conversations

### Dashboard

Displays:

- Total uploaded documents
- Total questions asked
- Recent uploads
- Recent conversations

### Search

- Search documents
- Search previous conversations

### Error Handling

- Invalid file uploads
- Unsupported file types
- Authentication errors
- Expired JWT tokens
- AI API failures
- Database errors

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### AI

- Google Gemini API

---

## Folder Structure

```
project-root
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── utils
│   ├── server.js
│   └── app.js
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   └── App.jsx
│   └── package.json
│
├── README.md
├── AI_USAGE.md
├── DEBUG_NOTES.md
└── ARCHITECTURE.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Run backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## Environment Variables

Backend

| Variable | Description |
|-----------|-------------|
| PORT | Backend server port |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT |
| GEMINI_API_KEY | Google Gemini API Key |

---

## Running the Application

Backend

```bash
cd Backend

npm run dev
```

Frontend

```bash
cd Frontend

npm run dev
```

Visit

```
http://localhost:5173
```

---

## API Endpoints

Authentication

```
POST /signup

POST /login
```

Documents

```
GET /documents

POST /documents

DELETE /documents/:id
```

AI

```
POST /ask
```

History

```
GET /history
```

Dashboard

```
GET /dashboard
```

---

## Design Decisions

- JWT used for stateless authentication.
- MongoDB selected for flexible document storage.
- Multer handles file uploads.
- Gemini API provides AI-powered responses.
- React Context manages authentication state.
- RESTful API design for maintainability.
- Modular backend architecture separates controllers, services, middleware, and models.

---

## Future Improvements

- Streaming AI responses
- Docker deployment
- Unit and integration testing
- Redis caching
- Pagination
- Role-based access control
- Multi-document querying
- AI conversation summarization
- File versioning
- Cloud storage integration
