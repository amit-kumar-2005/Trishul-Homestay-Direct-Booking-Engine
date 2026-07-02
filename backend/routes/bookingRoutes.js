import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Get All Bookings
router.get("/", getAllBookings);

// Get Booking By ID
router.get("/:id", getBookingById);

// Create Booking
router.post("/", createBooking);

// Update Booking
router.put("/:id", updateBooking);

// Update Booking Status
router.put("/:id/status", updateBookingStatus);

// Delete Booking
router.delete("/:id", deleteBooking);

export default router;