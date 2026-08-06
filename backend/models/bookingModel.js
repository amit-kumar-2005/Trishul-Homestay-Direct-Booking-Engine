import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // ==========================================
    // Logged-in User
    // ==========================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ==========================================
    // Selected Room
    // ==========================================

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    // ==========================================
    // Guest Information
    // ==========================================

    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    // ==========================================
    // Stay Dates
    // ==========================================

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    // ==========================================
    // Special Request
    // ==========================================

    specialRequest: {
      type: String,
      trim: true,
      default: "",
    },

    // ==========================================
    // Booking Status
    // ==========================================

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// Helpful Indexes
// ==========================================

// User booking history
bookingSchema.index({
  userId: 1,
  createdAt: -1,
});

// Availability / overlapping booking queries
bookingSchema.index({
  roomId: 1,
  checkIn: 1,
  checkOut: 1,
  status: 1,
});

const Booking = mongoose.model(
  "Booking",
  bookingSchema
);

export default Booking;