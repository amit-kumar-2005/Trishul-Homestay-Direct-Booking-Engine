import express from "express";

import {
  getAllBookings,
  getMyBookings,
  getBookingById,
  createBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// USER BOOKING ROUTES
// ======================================================

// ------------------------------------------------------
// Get Logged-in User's Bookings
// GET /api/bookings/my
// Protected: Yes
// ------------------------------------------------------

router.get(
  "/my",
  protect,
  getMyBookings
);

// ------------------------------------------------------
// Create New Booking
// POST /api/bookings
// Protected: Yes
// ------------------------------------------------------

router.post(
  "/",
  protect,
  createBooking
);

// ======================================================
// ADMIN BOOKING ROUTES
// ======================================================

// ------------------------------------------------------
// Get All Bookings
// GET /api/bookings
// Admin Only
// ------------------------------------------------------

router.get(
  "/",
  protect,
  admin,
  getAllBookings
);

// ======================================================
// DYNAMIC BOOKING ROUTES
// ======================================================

// ------------------------------------------------------
// Get Booking By ID
// GET /api/bookings/:id
//
// Controller checks:
// - Booking owner
// - OR Admin
// ------------------------------------------------------

router.get(
  "/:id",
  protect,
  getBookingById
);

// ------------------------------------------------------
// Update Booking
// PUT /api/bookings/:id
//
// Controller checks:
// - Booking owner
// - OR Admin
// ------------------------------------------------------

router.put(
  "/:id",
  protect,
  updateBooking
);

// ------------------------------------------------------
// Update Booking Status
// PUT /api/bookings/:id/status
//
// Normal User:
// - Can only cancel own booking
//
// Admin:
// - Can manage booking status
// ------------------------------------------------------

router.put(
  "/:id/status",
  protect,
  updateBookingStatus
);

// ------------------------------------------------------
// Delete Booking
// DELETE /api/bookings/:id
// Admin Only
// ------------------------------------------------------

router.delete(
  "/:id",
  protect,
  admin,
  deleteBooking
);

export default router;