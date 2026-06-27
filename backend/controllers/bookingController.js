import bookings from "../data/bookings.js";

// POST /api/bookings
export const createBooking = (req, res) => {
  const {
    roomId,
    guestName,
    email,
    phone,
    guests,
    checkIn,
    checkOut,
  } = req.body;

  const newBooking = {
    id: bookings.length + 1,
    roomId,
    guestName,
    email,
    phone,
    guests,
    checkIn,
    checkOut,
    status: "Pending",
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: newBooking,
  });
};

// PUT /api/bookings/:id
export const updateBooking = (req, res) => {
  const bookingId = Number(req.params.id);

  const booking = bookings.find((item) => item.id === bookingId);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  Object.assign(booking, req.body);

  res.status(200).json({
    success: true,
    message: "Booking updated successfully",
    data: booking,
  });
};

// DELETE /api/bookings/:id
export const deleteBooking = (req, res) => {
  const bookingId = Number(req.params.id);

  const index = bookings.findIndex((item) => item.id === bookingId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  const deletedBooking = bookings.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully",
    data: deletedBooking[0],
  });
};