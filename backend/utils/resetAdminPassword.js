import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/User.js";

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({
      email: "amitkumar6203557885@gmail.com",
    });

    if (!user) {
      console.log("❌ User not found");
      process.exit(1);
    }

    user.password = "Admin@123";
    await user.save();

    console.log("✅ Admin password reset successfully");
    console.log("Email:", user.email);
    console.log("Role:", user.role);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Password reset failed:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

resetAdminPassword();