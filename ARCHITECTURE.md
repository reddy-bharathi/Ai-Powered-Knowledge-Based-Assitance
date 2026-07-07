# Architecture Documentation

## Project Overview

The application follows a client-server architecture.

```
React Frontend

↓

Express REST API

↓

MongoDB Database

↓

Gemini AI API
```

The frontend communicates with the backend using REST APIs. The backend manages authentication, document storage, AI processing, and database operations.

---

# Project Structure

## Frontend

```
src/

components/
pages/
services/
context/
hooks/
utils/
```

Responsibilities:

- User Interface
- Authentication
- API Calls
- Dashboard
- Chat Interface

---

## Backend

```
controllers/
routes/
middleware/
models/
services/
uploads/
utils/
```

Responsibilities:

- Authentication
- File Upload
- AI Integration
- Database Access
- Business Logic

---

# Database Design

## Users Collection

```
User

_id

name

email

password

createdAt
```

---

## Documents Collection

```
Document

_id

title

filename

fileType

owner

uploadTime

metadata

createdAt
```

---

## Conversations Collection

```
Conversation

_id

user

document

question

answer

timestamp
```

Relationships

```
User

│

├── Documents

│

└── Conversations
```

Each document belongs to one user.

Each conversation references both the user and the document.

---

# Authentication

Authentication uses JWT.

Flow

```
Register

↓

Password Hashing

↓

Store User

↓

Login

↓

Generate JWT

↓

Client Stores Token

↓

Protected Requests

↓

JWT Verification Middleware
```

Passwords are hashed using bcrypt before storage.

JWT middleware protects all authenticated routes.

---

# Engineering Decisions

### React

Chosen for reusable UI components and fast development.

### MongoDB

Provides flexible schema for document metadata and chat history.

### JWT

Stateless authentication simplifies scaling.

### Multer

Reliable middleware for handling multipart file uploads.

### Gemini

Provides accurate AI responses with a simple API.

### Modular Architecture

Controllers, services, middleware, and models are separated to improve maintainability and readability.

---

# Scalability Improvements

If this application were deployed to production, the following improvements would be implemented:

- Store uploaded files in AWS S3 instead of local storage.
- Use MongoDB Atlas for managed database hosting.
- Introduce Redis for caching dashboard statistics.
- Add background workers for document processing.
- Implement rate limiting.
- Implement pagination for large datasets.
- Add role-based authorization.
- Enable streaming AI responses.

---

# Summary

The application is designed using clean separation of concerns with a modular backend and reusable frontend components. The architecture supports future scalability, maintainability, and production deployment while remaining simple enough for educational and assessment purposes.
