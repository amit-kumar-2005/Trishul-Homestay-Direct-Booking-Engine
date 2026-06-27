const rooms = [
  {
    id: 1,
    name: "Standard Room",
    category: "Standard",
    price: 2499,
    guests: 2,
    beds: 1,
    bathrooms: 1,
    size: "220 sq.ft",
    available: true,
    image: "/images/standard-room.jpg",
    description:
      "Comfortable room with mountain views, free Wi-Fi, TV and complimentary breakfast.",
    amenities: [
      "Free WiFi",
      "Breakfast",
      "TV",
      "Parking"
    ]
  },

  {
    id: 2,
    name: "Deluxe Cottage",
    category: "Deluxe",
    price: 3999,
    guests: 3,
    beds: 2,
    bathrooms: 1,
    size: "320 sq.ft",
    available: true,
    image: "/images/deluxe-room.jpg",
    description:
      "Premium cottage surrounded by nature with balcony and beautiful valley view.",
    amenities: [
      "Free WiFi",
      "Breakfast",
      "Balcony",
      "Parking",
      "Room Service"
    ]
  },

  {
    id: 3,
    name: "Family Suite",
    category: "Family",
    price: 5499,
    guests: 5,
    beds: 3,
    bathrooms: 2,
    size: "520 sq.ft",
    available: false,
    image: "/images/family-suite.jpg",
    description:
      "Large family suite ideal for group stays with spacious living area.",
    amenities: [
      "Free WiFi",
      "Breakfast",
      "Living Room",
      "Parking",
      "Mountain View"
    ]
  }
];

export default rooms;