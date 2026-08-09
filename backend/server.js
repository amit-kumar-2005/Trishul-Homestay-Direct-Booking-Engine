import process from "node:process";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";

import connectDB from "./config/db.js";

// ======================================
// Routes
// ======================================

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// ======================================
// Error Middleware
// ======================================

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

// ======================================
// Environment Variables
// ======================================

dotenv.config();

// ======================================
// Connect MongoDB
// ======================================

connectDB();

// ======================================
// Express App
// ======================================

const app = express();

// ======================================
// CORS Configuration
// ======================================

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      // Allow Postman and server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ======================================
// JSON Middleware
// ======================================

app.use(express.json());

// ======================================
// Session Configuration
// ======================================

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// ======================================
// Passport Configuration
// ======================================

app.use(passport.initialize());

app.use(passport.session());

// ======================================
// Server Port
// ======================================

const PORT = process.env.PORT || 5000;

// ======================================
// Home Route
// ======================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Welcome to Trishul Homestay Direct Booking Engine API",
    version: "2.0.0",
    database: "MongoDB Atlas",
    authentication:
      "JWT + Google OAuth + Gemini AI",
  });
});

// ======================================
// API Routes
// ======================================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Room Routes
app.use("/api/rooms", roomRoutes);

// Booking Routes
app.use("/api/bookings", bookingRoutes);

// Availability Routes
app.use(
  "/api/availability",
  availabilityRoutes
);

// AI Routes
app.use("/api/ai", aiRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// ======================================
// 404 Middleware
// ======================================

app.use(notFound);

// ======================================
// Global Error Middleware
// ======================================

app.use(errorHandler);

// ======================================
// Start Server
// ======================================

app.listen(PORT, () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT}`
  );
});