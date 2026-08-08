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

    // ======================================
    // Price Filter
    // ======================================

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // ======================================
    // Guests Filter
    // ======================================

    if (guests) {
      filter.guests = Number(guests);
    }

    // ======================================
    // Availability Filter
    // ======================================

    if (available !== undefined) {
      filter.isAvailable = available === "true";
    }

    // ======================================
    // Query Builder
    // ======================================

    let query = Room.find(filter);

    if (sort === "price_asc") {
      query = query.sort({
        price: 1,
      });
    }

    if (sort === "price_desc") {
      query = query.sort({
        price: -1,
      });
    }

    // ======================================
    // Pagination
    // ======================================

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    query = query
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const rooms = await query;

    const totalRooms =
      await Room.countDocuments(filter);

    return res.status(200).json({
      success: true,
      count: rooms.length,
      totalRooms,
      currentPage: pageNumber,
      totalPages: Math.ceil(
        totalRooms / pageSize
      ),
      data: rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET /api/rooms/:id
// ======================================

export const getRoomById = async (
  req,
  res
) => {
  try {
    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET /api/rooms/search?q=
// ======================================

export const searchRooms = async (
  req,
  res
) => {
  try {
    const keyword = req.query.q
      ? {
          name: {
            $regex: req.query.q,
            $options: "i",
          },
        }
      : {};

    const rooms = await Room.find(
      keyword
    );

    return res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// POST /api/rooms
// Admin Only
// ======================================

export const createRoom = async (req, res) => {
  try {
    const {
      name,
      price,
      guests,
      beds,
      bathrooms,
      description,
      image,
      amenities,
      isAvailable,
    } = req.body;

    if (
      !name ||
      !price ||
      !guests ||
      !beds ||
      !bathrooms ||
      !description ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const room = await Room.create({
      name: name.trim(),
      price: Number(price),
      guests: Number(guests),
      beds: Number(beds),
      bathrooms: Number(bathrooms),
      description: description.trim(),
      image: image.trim(),
      amenities: Array.isArray(amenities)
        ? amenities
        : [],
      isAvailable:
        isAvailable !== undefined
          ? isAvailable
          : true,
    });

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// PUT /api/rooms/:id
// Admin Only
// ======================================

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const {
      name,
      price,
      guests,
      beds,
      bathrooms,
      description,
      image,
      amenities,
      isAvailable,
    } = req.body;

    room.name =
      name ?? room.name;

    room.price =
      price !== undefined
        ? Number(price)
        : room.price;

    room.guests =
      guests !== undefined
        ? Number(guests)
        : room.guests;

    room.beds =
      beds !== undefined
        ? Number(beds)
        : room.beds;

    room.bathrooms =
      bathrooms !== undefined
        ? Number(bathrooms)
        : room.bathrooms;

    room.description =
      description ??
      room.description;

    room.image =
      image ?? room.image;

    room.amenities =
      amenities ??
      room.amenities;

    room.isAvailable =
      isAvailable !== undefined
        ? isAvailable
        : room.isAvailable;

    const updatedRoom =
      await room.save();

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// DELETE /api/rooms/:id
// Admin Only
// ======================================

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    await room.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// TOGGLE ROOM AVAILABILITY
// PUT /api/rooms/:id/availability
// Admin Only
// ======================================

export const toggleRoomAvailability = async (
  req,
  res
) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    room.isAvailable = !room.isAvailable;

    await room.save();

    return res.status(200).json({
      success: true,
      message: `Room ${
        room.isAvailable
          ? "marked available"
          : "marked unavailable"
      } successfully`,
      data: room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};