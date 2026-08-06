import express from "express";

import {
  getAdminDashboardStats,
} from "../controllers/adminController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// Admin Dashboard Statistics
// GET /api/admin/dashboard
// Admin Only
// ==========================================

router.get(
  "/dashboard",
  protect,
  admin,
  getAdminDashboardStats
);

export default router;