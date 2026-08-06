import express from "express";

import {
  getAvailability,
  getAvailabilityByRoom,
  checkAvailability,
} from "../controllers/availabilityController.js";

const router = express.Router();

// ==========================================
// Check Available Rooms
// POST /api/availability/check
// ==========================================

router.post("/check", checkAvailability);

// ==========================================
// Get All Availability
// GET /api/availability
// ==========================================

router.get("/", getAvailability);

// ==========================================
// Get Availability By Room ID
// GET /api/availability/:roomId
// ==========================================

router.get("/:roomId", getAvailabilityByRoom);

export default router;