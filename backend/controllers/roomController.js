import rooms from "../data/rooms.js";

// GET /api/rooms
export const getAllRooms = (req, res) => {
  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms,
  });
};

// GET /api/rooms/:id
export const getRoomById = (req, res) => {
  const roomId = Number(req.params.id);

  const room = rooms.find((item) => item.id === roomId);

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
};

// GET /api/rooms/search?q=
export const searchRooms = (req, res) => {
  const query = (req.query.q || "").toLowerCase();

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(query) ||
      room.category.toLowerCase().includes(query)
  );

  res.status(200).json({
    success: true,
    count: filteredRooms.length,
    data: filteredRooms,
  });
};