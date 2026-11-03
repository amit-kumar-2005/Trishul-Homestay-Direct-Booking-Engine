
import express from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
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

// Register User
router.post(
  "/register",
  authLimiter,
  registerValidator,
  validate,
  registerUser
);

// Login User
router.post(
  "/login",
  authLimiter,
  loginValidator,
  validate,
  loginUser
);

// Forgot Password
router.post(
  "/forgot-password",
  authLimiter,
  forgotPassword
);

// Reset Password
router.post(
  "/reset-password/:token",
  authLimiter,
  resetPassword
);

// ======================================
// Google OAuth
// ======================================

// Start Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    res.redirect(
      `http://localhost:5173/auth/google/callback?token=${req.user.token}`
    );
  }
);

// ======================================
// Protected Routes
// ======================================

// Get Current Logged-in User
router.get(
  "/me",
  protect,
  getCurrentUser
);

// Logout User
router.post(
  "/logout",
  protect,
  logoutUser
);

export default router;
