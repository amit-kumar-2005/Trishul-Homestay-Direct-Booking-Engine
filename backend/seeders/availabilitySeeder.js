import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Room from "../models/Room.js";
import Availability from "../models/availabilityModel.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    // Delete old availability
    await Availability.deleteMany();

    // Get all rooms
    const rooms = await Room.find();

    const availabilityData = [];

    // Generate availability for next 30 days
    for (const room of rooms) {
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        availabilityData.push({
          roomId: room._id,
          date,
          available: true,
        });
      }
    }

    await Availability.insertMany(availabilityData);

    console.log("✅ Availability Seeded Successfully");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

importData();