
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Users, BedDouble, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function BookingBar() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  // Booking Form State
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomType: "Standard Room",
  });

  const [error, setError] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // Handle Check Availability
  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (!formData.checkIn) {
      setError("Please select your check-in date.");
      return;
    }

    if (!formData.checkOut) {
      setError("Please select your check-out date.");
      return;
    }

    const checkInDate = new Date(
      `${formData.checkIn}T00:00:00`
    );

    const checkOutDate = new Date(
      `${formData.checkOut}T00:00:00`
    );

    const todayDate = new Date(`${today}T00:00:00`);

    if (checkInDate < todayDate) {
      setError("Check-in date cannot be in the past.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    // Navigate to Availability Page with Booking Details
    navigate("/availability", {
      state: {
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
        roomType: formData.roomType,
      },
    });
  };

  return (
    <section className="relative mt-0 z-20">
      <div className="max-w-7xl mx-auto px-6">

        <form
          onSubmit={handleCheckAvailability}
          className={`rounded-3xl shadow-xl p-6 md:p-8 transition-colors duration-300 ${
            darkMode
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-900"
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Check-In */}

            <div>
              <label
                htmlFor="checkIn"
                className="flex items-center gap-2 mb-2 font-medium"
              >
                <CalendarDays size={17} className="text-teal-600" />
                Check-In
              </label>

              <input
                id="checkIn"
                type="date"
                name="checkIn"
                value={formData.checkIn}
                min={today}
                onChange={handleChange}
                required
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>

            {/* Check-Out */}

            <div>
              <label
                htmlFor="checkOut"
                className="flex items-center gap-2 mb-2 font-medium"
              >
                <CalendarDays size={17} className="text-teal-600" />
                Check-Out
              </label>

              <input
                id="checkOut"
                type="date"
                name="checkOut"
                value={formData.checkOut}
                min={formData.checkIn || today}
                onChange={handleChange}
                required
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>

            {/* Guests */}

            <div>
              <label
                htmlFor="guests"
                className="flex items-center gap-2 mb-2 font-medium"
              >
                <Users size={17} className="text-teal-600" />
                Guests
              </label>

              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>
            </div>

            {/* Room Type */}

            <div>
              <label
                htmlFor="roomType"
                className="flex items-center gap-2 mb-2 font-medium"
              >
                <BedDouble size={17} className="text-teal-600" />
                Room Type
              </label>

              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                <option value="All Rooms">All Rooms</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Deluxe Cottage">Deluxe Cottage</option>
                <option value="Family Suite">Family Suite</option>
              </select>
            </div>

            {/* Submit Button */}

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition duration-300 flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Check Availability
              </button>
            </div>

          </div>

          {/* Validation Error */}

          {error && (
            <p className="mt-4 text-sm text-red-500 font-medium">
              {error}
            </p>
          )}

        </form>
      </div>
    </section>
  );
}
