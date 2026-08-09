import Availability from "../models/availabilityModel.js";
import Room from "../models/Room.js";
import Booking from "../models/bookingModel.js";

// ==========================================
// Get All Availability
// GET /api/availability
// ==========================================
export const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find()
      .populate("roomId", "name price guests image")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: availability.length,
      data: availability,
    });
  } catch (error) {
    console.error("Get Availability Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch availability",
    });
  }
};

// ==========================================
// Check Available Rooms
// POST /api/availability/check
// ==========================================
export const checkAvailability = async (req, res) => {
  try {
    const { checkIn, checkOut, guests } = req.body;

    // ======================================
    // Required Fields Validation
    // ======================================

    if (!checkIn || !checkOut || !guests) {
      return res.status(400).json({
        success: false,
        message:
          "Check-in date, check-out date and number of guests are required",
      });
    }

    // ======================================
    // Convert Input Values
    // ======================================

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const guestCount = Number(guests);

    // ======================================
    // Validate Dates
    // ======================================

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid check-in and check-out dates",
      });
    }

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      return res.status(400).json({
        success: false,
        message: "Number of guests must be at least 1",
      });
    }

    // Normalize dates to avoid time-related comparison problems

    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check-in cannot be in the past

    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past",
      });
    }

    // Check-out must be after check-in

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // ======================================
    // Find Rooms Matching Guest Capacity
    // ======================================

    const rooms = await Room.find({
      guests: { $gte: guestCount },
      isAvailable: true,
    });

    if (rooms.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        message:
          "No rooms are available for the selected number of guests",
        data: [],
      });
    }

    // ======================================
    // Find Conflicting Bookings
    // ======================================
    //
    // Two bookings overlap when:
    //
    // existing checkIn < requested checkOut
    // AND
    // existing checkOut > requested checkIn
    //
    // Example:
    //
    // Existing: 10 Aug -> 12 Aug
    // Requested: 11 Aug -> 13 Aug
    //
    // Conflict = YES
    //
    // Existing: 10 Aug -> 12 Aug
    // Requested: 12 Aug -> 14 Aug
    //
    // Conflict = NO
    // because previous guest checks out on 12 Aug.
    // ======================================

    const roomIds = rooms.map((room) => room._id);

    const conflictingBookings = await Booking.find({
      roomId: { $in: roomIds },

      status: {
  $in: ["Pending", "Confirmed"],
},

      checkIn: {
        $lt: checkOutDate,
      },

      checkOut: {
        $gt: checkInDate,
      },
    }).select("roomId");

    // ======================================
    // Create Set of Booked Room IDs
    // ======================================

    const bookedRoomIds = new Set(
      conflictingBookings.map((booking) =>
        booking.roomId.toString()
      )
    );

    // ======================================
    // Remove Booked Rooms
    // ======================================

    const availableRooms = rooms.filter(
      (room) => !bookedRoomIds.has(room._id.toString())
    );

    // ======================================
    // Success Response
    // ======================================

    return res.status(200).json({
      success: true,
      count: availableRooms.length,
      message:
        availableRooms.length > 0
          ? `${availableRooms.length} room(s) available for your selected dates`
          : "No rooms are available for the selected dates",
      search: {
        checkIn,
        checkOut,
        guests: guestCount,
      },
      data: availableRooms,
    });
  } catch (error) {
    console.error("Check Availability Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check room availability",
    });
  }
};

// ==========================================
// Get Availability By Room ID
// GET /api/availability/:roomId
// ==========================================
export const getAvailabilityByRoom = async (req, res) => {
  try {
    const availability = await Availability.find({
      roomId: req.params.roomId,
    })
      .populate("roomId", "name price guests image")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: availability.length,
      data: availability,
    });
  } catch (error) {
    console.error("Get Room Availability Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch room availability",
    });
  }
};