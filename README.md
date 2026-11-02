# Trishul Homestay Direct Booking Engine

A modern full-stack web application designed to simplify the homestay booking process. The platform allows users to explore rooms, check availability, submit booking requests, and manage their reservations through a responsive and user-friendly interface.

**Developed as an MCA 3rd Semester Mini Project** at Graphic Era (Deemed to be) University, Dehradun.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Project Objectives](#project-objectives)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Authentication and Authorization](#authentication-and-authorization)
- [AI Travel Assistant](#ai-travel-assistant)
- [Installation and Setup](#installation-and-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [Live Deployment](#live-deployment)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Academic Information](#academic-information)

---

## Project Overview

Trishul Homestay Direct Booking Engine is a full-stack web application developed to provide a convenient platform for managing homestay room discovery and booking activities.

The application provides separate functionalities for users and administrators. Users can browse available rooms, check availability, submit booking requests, and view their booking history. Administrators can manage room information and monitor booking activities through an administrative dashboard.

The system uses React for the frontend, Node.js and Express.js for backend services, and MongoDB Atlas for database management.

## Problem Statement

Traditional homestay booking processes often involve manual communication, limited room information, and difficulties in checking room availability.

Customers may need to contact property owners directly to obtain room details and booking information. This process can be time-consuming and inconvenient.

The proposed system provides a centralized digital platform where customers can explore rooms, check availability, and submit booking requests more conveniently.

## Project Objectives

- Develop a responsive homestay booking platform.
- Provide dynamic room listing and room details.
- Implement room search, filtering, and sorting.
- Allow users to check room availability.
- Enable users to register and log in securely.
- Implement role-based access for users and administrators.
- Provide booking management functionality.
- Store application data using MongoDB Atlas.
- Integrate an AI-powered travel assistant.
- Provide a user-friendly dashboard and modern interface.

## Key Features

### User Features

- User Registration and Login
- Google Authentication
- User Dashboard
- User Profile Information
- Browse Available Rooms
- Room Details
- Room Search and Filtering
- Price Sorting
- Pagination
- Room Availability Checking
- Booking Request Submission
- Booking History
- Booking Details
- Booking Cancellation
- Dark and Light Theme
- AI Travel Assistant
- WhatsApp Contact Integration

### Admin Features

- Admin Authentication
- Admin Dashboard
- Role-Based Access Control
- Room Management
- Add New Rooms
- Update Room Information
- Delete Rooms
- Booking Management
- Booking Status Management

### General Features

- Responsive User Interface
- RESTful API Architecture
- MongoDB Atlas Integration
- Mongoose ODM
- Form Validation
- Error Handling Middleware
- Axios API Integration
- JWT-Based Authentication

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | User interface development |
| Vite | Frontend development and build tool |
| Tailwind CSS | Responsive styling |
| JavaScript | Application functionality |
| Axios | API communication |
| React Router DOM | Client-side routing |
| Lucide React | Icons |
| React Toastify | Notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| REST API | Client-server communication |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Passport.js | Authentication integration |
| Express Validator | Request validation |
| CORS | Cross-origin communication |
| Dotenv | Environment configuration |

### Database

- MongoDB Atlas
- Mongoose ODM

### AI Integration

- Google Gemini API
- Google GenAI SDK

### Development and Testing Tools

- Visual Studio Code
- Git and GitHub
- Postman
- MongoDB Compass
- Draw.io
- Google Chrome

### Deployment

- Vercel – Frontend Hosting
- Render – Backend Hosting
- MongoDB Atlas – Cloud Database

---

## System Architecture

The application follows a client-server architecture.

1. **Frontend Layer:** React.js provides the user interface and communicates with the backend through Axios.
2. **Backend Layer:** Node.js and Express.js process API requests, authentication, booking operations, and application logic.
3. **Database Layer:** MongoDB Atlas stores user, room, booking, and availability information.
4. **Authentication Layer:** JWT-based authentication and role-based authorization protect restricted resources.
5. **AI Layer:** Google Gemini integration powers the AI Travel Assistant.

### Application Flow

```text
             USER / ADMIN
                  |
                  v
          React Frontend
                  |
                  v
          Axios API Requests
                  |
                  v
          Express.js Backend
                  |
          -------------------
          |        |        |
          v        v        v
        Auth    Booking   Room APIs
          |        |        |
          -------------------
                  |
                  v
             Mongoose ODM
                  |
                  v
            MongoDB Atlas

                  |
                  v
           Google Gemini API
           (AI Assistant)
```

---

## Project Structure

```text
trishul-homestay-react/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── data/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── docs/
│   ├── W5_Database_Schema.drawio
│   ├── W5_Database_Schema.png
│   └── TBI-26100150_W5_Postman_API_Testing.pdf
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ai/
│   │   ├── availability/
│   │   ├── booking/
│   │   ├── common/
│   │   ├── home/
│   │   ├── rooms/
│   │   └── ui/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── package.json
├── README.md
└── .gitignore
```

---

## Database Design

The application uses **MongoDB Atlas** as its cloud database and **Mongoose ODM** for schema definition, validation, and database operations.

### Main Collections

#### 1. User Collection

Stores registered user and administrator information.

Main fields:

- `_id`
- `name`
- `email`
- `password`
- `role`
- `createdAt`
- `updatedAt`

#### 2. Room Collection

Stores homestay room information.

Main fields:

- `_id`
- `name`
- `price`
- `guests`
- `beds`
- `bathrooms`
- `description`
- `image`
- `amenities`
- `isAvailable`
- `createdAt`
- `updatedAt`

#### 3. Booking Collection

Stores customer booking information.

Main fields:

- `_id`
- `roomId`
- `guestName`
- `email`
- `phone`
- `guests`
- `checkIn`
- `checkOut`
- `status`
- `createdAt`
- `updatedAt`

#### 4. Availability Collection

Stores room availability information.

Main fields:

- `_id`
- `roomId`
- `date`
- `isAvailable`
- `createdAt`
- `updatedAt`

### Database Relationships

```text
Room (1) -------- (N) Booking

Room (1) -------- (N) Availability
```

### Database Schema Diagram

The database schema was designed using Draw.io.

![Database Schema](docs/W5_Database_Schema.png)

---

## API Documentation

The backend exposes RESTful APIs for room management, availability checking, authentication, and booking operations.

### 1. Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User/Admin login |
| GET | `/api/auth/me` | Get authenticated user |
| POST | `/api/auth/logout` | Logout |

### 2. Room APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/rooms/:id` | Get room by ID |
| GET | `/api/rooms/search?q=keyword` | Search rooms |

Supported operations include room filtering, price sorting, guest filtering, and pagination.

### 3. Availability APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/availability` | Check room availability |

### 4. Booking APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bookings` | Get bookings |
| GET | `/api/bookings/:id` | Get booking details |
| POST | `/api/bookings` | Create booking |
| PUT | `/api/bookings/:id` | Update booking |
| PUT | `/api/bookings/:id/status` | Update booking status |
| DELETE | `/api/bookings/:id` | Delete booking |

*Note: API access and permitted operations depend on the authentication and authorization middleware.*

---

## Authentication and Authorization

The application implements authentication and role-based access control.

### Authentication Features

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Token Generation
- Protected Routes
- Authenticated User Profile
- Google Authentication Integration

### Role-Based Access Control

Two application roles are supported:

**User**
- Access user dashboard.
- Browse rooms.
- Check availability.
- Submit booking requests.
- View booking history.

**Admin**
- Access admin dashboard.
- Manage rooms.
- Manage booking activities.
- Update booking statuses.

Protected routes restrict access based on the authenticated user's role.

---

## AI Travel Assistant

The application includes an AI-powered Travel Assistant integrated with Google Gemini.

The chatbot provides a conversational interface to help users with homestay-related queries.

### Supported Assistance Areas

- Room availability-related queries
- Booking information
- Check-in and check-out information
- Homestay facilities
- Nearby attractions
- General travel assistance

The frontend provides an interactive chatbot interface with message history, loading indicators, and formatted AI responses.

---

## Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Install the following software:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Visual Studio Code

### 1. Clone Repository

```bash
git clone https://github.com/amit-kumar-2005/Trishul-Homestay-Direct-Booking-Engine.git
```

### 2. Navigate to Project Directory

```bash
cd Trishul-Homestay-Direct-Booking-Engine
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Environment Configuration

Create a `.env` file inside the `backend` directory.

Example configuration:

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secure_jwt_secret

JWT_EXPIRE=7d

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GOOGLE_CALLBACK_URL=your_google_callback_url
```

If your AI integration requires an API key, configure it using the exact environment variable name referenced in your AI service code.

For frontend API configuration, create or update the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

**Important:**

- Never upload your actual `.env` files to GitHub.
- Keep database credentials and API keys private.
- Configure production environment variables separately on the hosting platforms.
- Use the variable names expected by the application code.

---

## Running the Application

The frontend and backend must run in separate terminals.

### 1. Start Backend

```bash
cd backend
npm run dev
```

Backend development server:

```text
http://localhost:5000
```

### 2. Start Frontend

Open another terminal in the project root directory.

```bash
npm run dev
```

Frontend development server:

```text
http://localhost:5173
```

Open the frontend URL in your browser to access the application.

---

## Screenshots

Add screenshots of the actual running application in the `docs/screenshots/` directory.

Suggested screenshots:

| Screenshot | Description |
|---|---|
| `homepage.png` | Application homepage |
| `rooms.png` | Room listing page |
| `room-details.png` | Room details page |
| `availability.png` | Availability checking page |
| `booking.png` | Booking form |
| `login.png` | Login page |
| `register.png` | Registration page |
| `user-dashboard.png` | User dashboard |
| `admin-dashboard.png` | Admin dashboard |
| `ai-assistant.png` | AI Travel Assistant |

Example:

```markdown
![Homepage](docs/screenshots/homepage.png)

![Room Listing](docs/screenshots/rooms.png)

![User Dashboard](docs/screenshots/user-dashboard.png)
```

---

## Live Deployment

### Frontend

[Trishul Homestay – Live Website](https://trishul-homestay-direct-booking-eng.vercel.app)

### Backend

[Trishul Homestay – Backend API](https://trishul-homestay-direct-booking-engine-1.onrender.com)

### GitHub Repository

[View Source Code on GitHub](https://github.com/amit-kumar-2005/Trishul-Homestay-Direct-Booking-Engine)

### Deployment Services

| Service | Platform |
|---|---|
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Cloud Database | MongoDB Atlas |

---

## Testing

The application has been tested using Postman and through browser-based functional testing.

### Backend API Testing

- User Registration API
- User Login API
- Current User API
- Room Listing API
- Room Details API
- Room Search and Filtering
- Availability API
- Booking Creation API
- Booking Details API
- Booking Management APIs

### Authentication Testing

- Successful registration
- Successful login
- JWT token generation
- Protected route access
- Unauthorized access handling
- Role-based access restrictions

### Frontend Testing

- Page navigation
- Responsive layout
- User dashboard
- Admin dashboard
- Room browsing
- Booking workflow
- Dark and Light Theme
- AI chatbot interface

---

## Future Enhancements

The project can be extended with the following functionalities:

- Online Payment Gateway Integration
- Booking Invoice Generation
- Email and SMS Notifications
- Advanced Booking Calendar
- Image Upload Management
- Review and Rating System
- Advanced Admin Analytics
- Enhanced AI Travel Recommendations
- Booking Reports and Analytics
- Improved Security and Rate Limiting

---

## Academic Information

**Project Title:** Trishul Homestay Direct Booking Engine

**Project Type:** MCA 3rd Semester Mini Project

**Student Name:** Amit Kumar

**Course:** Master of Computer Applications (MCA)

**Semester:** 3rd Semester

**University:** Graphic Era (Deemed to be) University, Dehradun

---

## Acknowledgement

The initial development journey of this project began during the TBI GEU SIP 2026 Full Stack Development Internship. The project has subsequently been extended and enhanced for academic mini-project purposes as part of the MCA curriculum.

---

## Author

**Amit Kumar**

MCA – 3rd Semester

Graphic Era (Deemed to be) University, Dehradun

**GitHub:** [amit-kumar-2005](https://github.com/amit-kumar-2005)

---

*Trishul Homestay Direct Booking Engine – A Full Stack Web Development Project.*