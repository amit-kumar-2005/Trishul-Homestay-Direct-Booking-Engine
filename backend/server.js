import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Trishul Homestay Direct Booking Engine API",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);

// 404 Middleware
app.use(notFound);

// Global Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});