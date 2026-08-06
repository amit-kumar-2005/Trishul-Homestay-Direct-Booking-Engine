import Booking from "../models/bookingModel.js";

// ==========================================
// Get All Bookings
// GET /api/bookings
// Admin Only
// ==========================================

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId", "name price image guests")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get All Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// ==========================================
// Get Logged-in User Bookings
// GET /api/bookings/my
// ==========================================

export const getMyBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Please login to view your bookings",
      });
    }

    const bookings = await Booking.find({
      userId: req.user._id,
    })
      .populate(
        "roomId",
        "name price image guests beds bathrooms"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      message:
        bookings.length > 0
          ? "Your bookings fetched successfully"
          : "You have not made any bookings yet",
      data: bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your bookings",
    });
  }
};

// ==========================================
// Get Booking By ID
// GET /api/bookings/:id
// Owner OR Admin
// ==========================================

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate(
        "roomId",
        "name price image guests beds bathrooms"
      )
      .populate("userId", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const isOwner =
      booking.userId?._id?.toString() ===
      req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to view this booking",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get Booking Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch booking",
    });
  }
};

// ==========================================
// Create Booking
// POST /api/bookings
// Protected
// ==========================================

export const createBooking = async (req, res) => {
  try {
    // ========================================
    // Authentication Check
    // ========================================

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Please login to create a booking",
      });
    }

    // ========================================
    // Request Body Check
    // ========================================

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const {
      roomId,
      guestName,
      email,
      phone,
      guests,
      checkIn,
      checkOut,
      specialRequest,
    } = req.body;

    // ========================================
    // Required Fields
    // ========================================

    if (
      !roomId ||
      !guestName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !guests ||
      !checkIn ||
      !checkOut
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ========================================
    // Guest Validation
    // ========================================

    const guestCount = Number(guests);

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      return res.status(400).json({
        success: false,
        message: "Number of guests must be at least 1",
      });
    }

    // ========================================
    // Date Validation
    // ========================================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide valid check-in and check-out dates",
      });
    }

    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out date must be after check-in date",
      });
    }

    // ========================================
    // Check Room Date Conflict
    // ========================================

    const existingBooking = await Booking.findOne({
      roomId,

      status: {
        $ne: "Cancelled",
      },

      checkIn: {
        $lt: checkOutDate,
      },

      checkOut: {
        $gt: checkInDate,
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message:
          "Room is already booked for selected dates",
      });
    }

    // ========================================
    // Create Booking
    // ========================================

    const booking = await Booking.create({
      userId: req.user._id,
      roomId,
      guestName: guestName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      guests: guestCount,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      specialRequest: specialRequest?.trim() || "",
    });

    await booking.populate(
      "roomId",
      "name price image guests beds bathrooms"
    );

    await booking.populate("userId", "name email");

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create booking",
    });
  }
};

// ==========================================
// Update Booking
// PUT /api/bookings/:id
// Owner OR Admin
// ==========================================

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const isOwner =
      booking.userId?.toString() ===
      req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this booking",
      });
    }

    // User ownership must never be transferred.
    delete req.body.userId;

    // Status should only be changed through
    // PUT /api/bookings/:id/status
    delete req.body.status;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate(
        "roomId",
        "name price image guests beds bathrooms"
      )
      .populate("userId", "name email");

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Update Booking Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update booking",
    });
  }
};

// ==========================================
// Update Booking Status
// PUT /api/bookings/:id/status
//
// USER:
// Pending   -> Cancelled
// Confirmed -> Cancelled
//
// ADMIN:
// Pending   -> Confirmed / Cancelled
// Confirmed -> Completed / Cancelled
//
// FINAL:
// Completed
// Cancelled
// ==========================================

export const updateBookingStatus = async (req, res) => {
  try {
    // ========================================
    // Authentication Check
    // ========================================

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Please login to update booking status",
      });
    }

    // ========================================
    // Get Requested Status
    // ========================================

    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Booking status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    // ========================================
    // Find Booking
    // ========================================

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ========================================
    // Determine Current User
    // ========================================

    const isOwner =
      booking.userId?.toString() ===
      req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    const currentStatus = booking.status;

    // ========================================
    // Same Status Protection
    // ========================================

    if (currentStatus === status) {
      return res.status(400).json({
        success: false,
        message: `Booking is already ${currentStatus}`,
      });
    }

    // ========================================
    // Final Status Protection
    // ========================================

    if (currentStatus === "Completed") {
      return res.status(400).json({
        success: false,
        message:
          "Completed booking status cannot be changed",
      });
    }

    if (currentStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message:
          "Cancelled booking status cannot be changed",
      });
    }

    // ========================================
    // NORMAL USER RULES
    // ========================================

    if (!isAdmin) {
      // User must own booking.

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to update this booking",
        });
      }

      // Normal user can only cancel.

      if (status !== "Cancelled") {
        return res.status(403).json({
          success: false,
          message:
            "Users can only cancel their own bookings",
        });
      }

      // Only Pending or Confirmed can be cancelled.

      if (
        currentStatus !== "Pending" &&
        currentStatus !== "Confirmed"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "This booking cannot be cancelled",
        });
      }
    }

    // ========================================
    // ADMIN STATUS TRANSITION RULES
    // ========================================

    if (isAdmin) {
      const adminTransitions = {
        Pending: ["Confirmed", "Cancelled"],
        Confirmed: ["Completed", "Cancelled"],
        Completed: [],
        Cancelled: [],
      };

      const validNextStatuses =
        adminTransitions[currentStatus] || [];

      if (!validNextStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Cannot change booking status from ${currentStatus} to ${status}`,
        });
      }
    }

    // ========================================
    // Update Status
    // ========================================

    booking.status = status;

    await booking.save();

    // ========================================
    // Populate Updated Booking
    // ========================================

    await booking.populate(
      "roomId",
      "name price image guests beds bathrooms"
    );

    await booking.populate("userId", "name email");

    // ========================================
    // Dynamic Success Message
    // ========================================

    let message = "Booking status updated successfully";

    if (status === "Confirmed") {
      message = "Booking confirmed successfully";
    }

    if (status === "Completed") {
      message = "Booking marked as completed successfully";
    }

    if (status === "Cancelled") {
      message = "Booking cancelled successfully";
    }

    // ========================================
    // Success Response
    // ========================================

    return res.status(200).json({
      success: true,
      message,
      data: booking,
    });
  } catch (error) {
    console.error("Update Booking Status Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update booking status",
    });
  }
};

// ==========================================
// Delete Booking
// DELETE /api/bookings/:id
// Admin Only Route
// ==========================================

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const isOwner =
      booking.userId?.toString() ===
      req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this booking",
      });
    }

    await booking.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to delete booking",
    });
  }
};