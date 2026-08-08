import express from "express";

import {
  getAllRooms,
  getRoomById,
  searchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  toggleRoomAvailability,
} from "../controllers/roomController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Search Rooms
router.get("/search", searchRooms);

// Get All Rooms
router.get("/", getAllRooms);

// Get Room By ID
router.get("/:id", getRoomById);

// ======================================
// Admin Routes
// ======================================

// Create Room
router.post(
  "/",
  protect,
  admin,
  createRoom
);

// Update Room
router.put(
  "/:id",
  protect,
  admin,
  updateRoom
);

// Delete Room
router.delete(
  "/:id",
  protect,
  admin,
  deleteRoom
);

// Toggle Availability
router.put(
  "/:id/availability",
  protect,
  admin,
  toggleRoomAvailability
);

export default router;