import express from "express";
import {
  getAvailability,
  getAvailabilityByRoom,
} from "../controllers/availabilityController.js";

const router = express.Router();

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