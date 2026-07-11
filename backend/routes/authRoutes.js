import express from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

router.post("/register", registerUser);

router.post("/login", loginUser);

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
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token: req.user.token,
      data: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

// ======================================
// Protected Routes
// ======================================

router.get("/me", protect, getCurrentUser);

router.post("/logout", protect, logoutUser);

export default router;