# Trishul Homestay Direct Booking Engine

A modern full-stack homestay booking application developed as part of the **TBI GEU SIP 2026 Full Stack Development Internship**.

The application allows users to browse rooms, search accommodations, check availability, and submit booking requests through a responsive React frontend powered by an Express REST API.

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* REST API
* CORS
* Dotenv

## Tools

* Git & GitHub
* Postman
* VS Code

---

# Project Structure

```text
trishul-homestay-react
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── data
│   ├── utils
│   ├── server.js
│   ├── package.json
│   └── .env.example
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

* Responsive User Interface
* Dark / Light Theme
* Dynamic Room Listing
* Room Details API
* Room Search
* Availability Checking
* Booking Form
* Booking Management
* RESTful Backend APIs
* Axios Integration
* Error Handling Middleware

---

# REST API Endpoints

## Rooms

GET `/api/rooms`

GET `/api/rooms/:id`

GET `/api/rooms/search?q=keyword`

---

## Availability

GET `/api/availability`

---

## Bookings

POST `/api/bookings`

PUT `/api/bookings/:id`

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

## 3. Run Frontend

```bash
npm run dev
```

Frontend URL

```text
http://localhost:5173
```

---

## 4. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 5. Create Environment File

Create a `.env` file inside the **backend** folder.

Example

```env
PORT=5000
```

You can also copy values from:

```text
.env.example
```

---

## 6. Run Backend

```bash
npm run dev
```

Backend URL

```text
http://localhost:5000
```

---

# API Testing

All REST APIs were successfully tested using **Postman**.

Implemented API Operations:

* GET
* POST
* PUT
* DELETE

---

# Internship Progress

## Week 1

* Project Planning
* GitHub Repository Setup
* Initial Project Structure

## Week 2

* React + Vite Setup
* Tailwind CSS
* Routing
* Reusable Components

## Week 3

* UI/UX Improvements
* Responsive Design
* Dark / Light Theme
* Figma Wireframes
* Component Library

## Week 4

* Express Backend
* REST API Development
* Axios Integration
* Availability API
* Booking CRUD APIs
* Error Handling Middleware
* Postman API Testing
* Frontend & Backend Integration

---

# Future Improvements

* MongoDB Database Integration
* User Authentication
* Admin Dashboard
* Online Payments
* Booking History
* Email Notifications
* Image Upload
* Real-time Room Availability

---

# Author

**Amit Kumar**

**TBI GEU SIP 2026**

**Full Stack Development Internship**
