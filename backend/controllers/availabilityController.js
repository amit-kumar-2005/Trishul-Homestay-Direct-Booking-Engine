import Availability from "../models/availabilityModel.js";

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
    res.status(500).json({
      success: false,
      message: error.message,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};