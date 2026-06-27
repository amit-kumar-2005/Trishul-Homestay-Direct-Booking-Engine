import express from "express";
import {
  getAllRooms,
  getRoomById,
  searchRooms,
} from "../controllers/roomController.js";

const router = express.Router();

// Search Rooms
router.get("/search", searchRooms);

// Get All Rooms
router.get("/", getAllRooms);

// Get Room By ID
router.get("/:id", getRoomById);

export default router;