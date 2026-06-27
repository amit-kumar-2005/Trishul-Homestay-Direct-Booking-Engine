import express from "express";
import { getAvailability } from "../controllers/availabilityController.js";

const router = express.Router();

// GET /api/availability
router.get("/", getAvailability);

export default router;