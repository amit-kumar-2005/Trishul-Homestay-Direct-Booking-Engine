export const getAvailability = (req, res) => {
  const availability = [
    {
      id: 1,
      roomName: "Standard Room",
      available: true,
      guests: 2,
    },
    {
      id: 2,
      roomName: "Deluxe Cottage",
      available: true,
      guests: 3,
    },
    {
      id: 3,
      roomName: "Family Suite",
      available: false,
      guests: 5,
    },
  ];

  res.status(200).json({
    success: true,
    count: availability.length,
    data: availability,
  });
};