import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Room from "../models/Room.js";

dotenv.config();

await connectDB();

const rooms = [
  {
    name: "Standard Room",
    price: 2499,
    guests: 2,
    beds: 1,
    bathrooms: 1,
    description:
      "Comfortable room with mountain views, free Wi-Fi, TV and complimentary breakfast.",
    image: "/images/standard-room.jpg",
    amenities: [
      "Free WiFi",
      "TV",
      "Breakfast",
      "Mountain View"
    ]
  },

  {
    name: "Deluxe Cottage",
    price: 3999,
    guests: 3,
    beds: 2,
    bathrooms: 1,
    description:
      "Premium cottage surrounded by nature with balcony and beautiful valley view.",
    image: "/images/deluxe-cottage.jpg",
    amenities: [
      "Balcony",
      "Free WiFi",
      "Breakfast",
      "Valley View"
    ]
  },

  {
    name: "Family Suite",
    price: 5499,
    guests: 5,
    beds: 3,
    bathrooms: 2,
    description:
      "Large family suite ideal for group stays with spacious living area.",
    image: "/images/family-suite.jpg",
    amenities: [
      "Living Room",
      "TV",
      "Breakfast",
      "Parking"
    ]
  }
];

const importData = async () => {
  try {

    await Room.deleteMany();

    await Room.insertMany(rooms);

    console.log("✅ Rooms Seeded Successfully");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

importData();