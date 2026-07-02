import Room from "../models/Room.js";

// ======================================
// GET /api/rooms
// ======================================
export const getAllRooms = async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      guests,
      available,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Price Filter
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Guests Filter
    if (guests) {
      filter.guests = Number(guests);
    }

    // Availability Filter
    if (available !== undefined) {
      filter.isAvailable = available === "true";
    }

    // Build Query
    let query = Room.find(filter);

    // Price Sorting
    if (sort === "price_asc") {
      query = query.sort({ price: 1 });
    }

    if (sort === "price_desc") {
      query = query.sort({ price: -1 });
    }

    // Pagination
    const pageNumber = Number(page);
    const pageSize = Number(limit);

    query = query
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const rooms = await query;

    const totalRooms = await Room.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: rooms.length,
      totalRooms,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRooms / pageSize),
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET /api/rooms/:id
// ======================================
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET /api/rooms/search?q=
// ======================================
export const searchRooms = async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          name: {
            $regex: req.query.q,
            $options: "i",
          },
        }
      : {};

    const rooms = await Room.find(keyword);

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};