# Trishul Homestay Direct Booking Engine

A modern full-stack homestay booking application developed as part of the **TBI GEU SIP 2026 Full Stack Development Internship**.

The application allows users to browse rooms, search accommodations, filter rooms, check availability, and submit booking requests through a responsive React frontend powered by an Express REST API with MongoDB Atlas.

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- REST API
- CORS
- Dotenv

## Database

- MongoDB Atlas
- Mongoose ODM

## Tools

- Git & GitHub
- VS Code
- Postman
- MongoDB Compass
- Draw.io (Database Schema)

---

# Project Structure

```text
trishul-homestay-react
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seeders
│   ├── data
│   ├── utils
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── docs
│   ├── W5_Database_Schema.drawio
│   ├── W5_Database_Schema.png
│   └── TBI-26100150_W5_Postman_API_Testing.pdf
│
├── src
│   ├── assets
│   ├── components
│   ├── context
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── services
│   └── utils
│
├── package.json
└── README.md
```

---

# Features

- Responsive User Interface
- Dark / Light Theme
- Dynamic Room Listing
- Room Details API
- Room Search
- Room Filtering
- Room Sorting
- Pagination
- Availability Checking
- Booking Form
- Booking Validation
- Booking Status Management
- MongoDB Atlas Integration
- Mongoose ODM
- Persistent Database Storage
- RESTful Backend APIs
- Axios Integration
- Error Handling Middleware

---

# Database

## Database Choice

This project uses **MongoDB Atlas** as the cloud database for storing Rooms, Bookings, and Availability data.

## ODM

The backend uses **Mongoose** for schema creation, validation, relationships, and CRUD operations.

## Collections

### Room

Stores all room information.

**Fields**

- _id
- name
- price
- guests
- beds
- bathrooms
- description
- image
- amenities
- isAvailable
- createdAt
- updatedAt

### Booking

Stores customer booking information.

**Fields**

- _id
- roomId
- guestName
- email
- phone
- guests
- checkIn
- checkOut
- status
- createdAt
- updatedAt

### Availability

Stores daily room availability.

**Fields**

- _id
- roomId
- date
- isAvailable
- createdAt
- updatedAt

## Relationships

```
Room (1) -------- (N) Booking

Room (1) -------- (N) Availability
```

---

# Database Schema

The database schema was designed using **Draw.io**.

![Database Schema](docs/W5_Database_Schema.png)

---

# REST API Endpoints

## Rooms

GET `/api/rooms`

GET `/api/rooms/:id`

GET `/api/rooms/search?q=keyword`

### Supports

- Price Filter
- Guest Filter
- Availability Filter
- Price Sorting
- Pagination

---

## Availability

GET `/api/availability`

---

## Bookings

GET `/api/bookings`

GET `/api/bookings/:id`

POST `/api/bookings`

PUT `/api/bookings/:id`

PUT `/api/bookings/:id/status`

DELETE `/api/bookings/:id`

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Install Frontend Dependencies

```bash
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

You can also copy values from:

```
backend/.env.example
```

---

## 5. Run Backend

```bash
cd backend
npm run dev
```

Backend URL

```
https://trishul-homestay-direct-booking-engine-1.onrender.com
```

---

## 6. Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# API Testing

All REST APIs were successfully tested using **Postman**.

## Rooms API

- Get All Rooms
- Get Room By ID
- Search Rooms
- Filter Rooms
- Sort Rooms
- Pagination

## Booking API

- Create Booking
- Get All Bookings
- Get Booking By ID
- Update Booking
- Update Booking Status
- Delete Booking

## Availability API

- Check Room Availability

---

# Internship Progress

## Week 1

- Project Planning
- GitHub Repository Setup
- Initial Project Structure

## Week 2

- React + Vite Setup
- Tailwind CSS
- Routing
- Reusable Components

## Week 3

- UI/UX Improvements
- Responsive Design
- Dark / Light Theme
- Figma Wireframes
- Component Library

## Week 4

- Express Backend
- REST API Development
- Axios Integration
- Availability API
- Booking CRUD APIs
- Error Handling Middleware
- Frontend & Backend Integration

## Week 5

- MongoDB Atlas Setup
- Mongoose Integration
- Database Schema Design
- Room Model
- Booking Model
- Availability Model
- CRUD Operations
- Search API
- Filter API
- Sorting API
- Pagination
- Persistent Database Storage
- Database Schema Diagram
- Postman API Testing Documentation

---

# Future Improvements

- JWT Authentication
- Role-Based Access Control
- Admin Dashboard
- Online Payments
- Booking History
- Booking Invoice
- Booking Cancellation
- Email Notifications
- Image Upload
- Review & Rating System
- Analytics Dashboard

---

# Author

**Amit Kumar**

**Intern ID:** TBI-26100150

**TBI GEU SIP 2026**

**Full Stack Development Internship**