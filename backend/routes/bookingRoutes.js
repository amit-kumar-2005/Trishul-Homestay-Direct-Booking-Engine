import express from "express";
import {
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create Booking
router.post("/", createBooking);

// Update Booking
router.put("/:id", updateBooking);

// Delete Booking
router.delete("/:id", deleteBooking);

export default router;