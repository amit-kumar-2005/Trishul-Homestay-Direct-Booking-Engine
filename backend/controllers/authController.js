
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "node:crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";

// ======================================
// Register User
// POST /api/auth/register
// ======================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Login User
// POST /api/auth/login
// ======================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: generateToken(user._id),
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Forgot Password
// POST /api/auth/forgot-password
// ======================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Generic response prevents email account enumeration.
    const genericResponse = {
      success: true,
      message:
        "If an account exists with this email, a password reset link will be sent.",
    };

    if (!user) {
      return res.status(200).json(genericResponse);
    }

    // Generate a cryptographically secure random token.
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store only the SHA-256 hash in the database.
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires after 15 minutes.
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(resetTokenExpiry);

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL?.replace(/\/+$/, "");

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is missing in environment variables");
    }

    const resetUrl =
      `${frontendUrl}/reset-password/${resetToken}`;

    try {
      await sendPasswordResetEmail(user.email, resetUrl);
    } catch (emailError) {
      // Remove the token if email delivery fails.
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      throw emailError;
    }

    return res.status(200).json(genericResponse);
  } catch (error) {
    console.error("Forgot Password Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process password reset request. Please try again later.",
    });
  }
};

// ======================================
// Reset Password
// POST /api/auth/reset-password/:token
// ======================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset link",
      });
    }

    if (
      typeof password !== "string" ||
      password.length < 6
    ) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash the received token to match the stored database hash.
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find account with a valid, unexpired token.
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset link",
      });
    }

    // Update password. The User model's pre-save hook hashes it.
    user.password = password;

    // Invalidate the reset token after successful use.
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password. Please try again later.",
    });
  }
};

// ======================================
// Get Current User
// GET /api/auth/me
// ======================================

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Logout User
// POST /api/auth/logout
// ======================================

export const logoutUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
