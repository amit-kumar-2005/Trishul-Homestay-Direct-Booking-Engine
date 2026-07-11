import express from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";

import { validate } from "../middleware/validationMiddleware.js";

import { authLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

router.post(
  "/register",
  authLimiter,
  registerValidator,
  validate,
  registerUser
);

router.post(
  "/login",
  authLimiter,
  loginValidator,
  validate,
  loginUser
);

// ======================================
// Google OAuth
// ======================================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // Redirect to React app with JWT token

    res.redirect(
      `http://localhost:5173/auth/google/callback?token=${req.user.token}`
    );
  }
);

// ======================================
// Protected Routes
// ======================================

router.get("/me", protect, getCurrentUser);

router.post("/logout", protect, logoutUser);

export default router;