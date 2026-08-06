import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/bookingModel.js";

// ==========================================
// Get Admin Dashboard Statistics
// GET /api/admin/dashboard
// Admin Only
// ==========================================

export const getAdminDashboardStats = async (
  req,
  res
) => {
  try {
    // ========================================
    // Basic Counts
    // ========================================

    const [
      totalUsers,
      totalRooms,
      availableRooms,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
    ] = await Promise.all([
      User.countDocuments(),

      Room.countDocuments(),

      Room.countDocuments({
        isAvailable: true,
      }),

      Booking.countDocuments(),

      Booking.countDocuments({
        status: "Pending",
      }),

      Booking.countDocuments({
        status: "Confirmed",
      }),

      Booking.countDocuments({
        status: "Completed",
      }),

      Booking.countDocuments({
        status: "Cancelled",
      }),
    ]);

    // ========================================
    // Recent Bookings
    // ========================================

    const recentBookings = await Booking.find()
      .populate(
        "roomId",
        "name price image"
      )
      .populate(
        "userId",
        "name email role"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // ========================================
    // Estimated Revenue
    //
    // Revenue is calculated from
    // Confirmed + Completed bookings.
    // ========================================

    const revenueBookings = await Booking.find({
      status: {
        $in: ["Confirmed", "Completed"],
      },
    }).populate(
      "roomId",
      "price"
    );

    let estimatedRevenue = 0;

    revenueBookings.forEach((booking) => {
      if (
        !booking.roomId ||
        !booking.roomId.price ||
        !booking.checkIn ||
        !booking.checkOut
      ) {
        return;
      }

      const checkIn = new Date(
        booking.checkIn
      );

      const checkOut = new Date(
        booking.checkOut
      );

      const difference =
        checkOut.getTime() -
        checkIn.getTime();

      const nights = Math.max(
        0,
        Math.ceil(
          difference /
            (1000 * 60 * 60 * 24)
        )
      );

      estimatedRevenue +=
        Number(booking.roomId.price) *
        nights;
    });

    // ========================================
    // Success Response
    // ========================================

    return res.status(200).json({
      success: true,

      message:
        "Admin dashboard statistics fetched successfully",

      data: {
        users: {
          total: totalUsers,
        },

        rooms: {
          total: totalRooms,
          available: availableRooms,
          unavailable:
            totalRooms - availableRooms,
        },

        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed:
            confirmedBookings,
          completed:
            completedBookings,
          cancelled:
            cancelledBookings,
        },

        revenue: {
          estimated:
            estimatedRevenue,
        },

        recentBookings,
      },
    });
  } catch (error) {
    console.error(
      "Admin Dashboard Stats Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch admin dashboard statistics",
    });
  }
};