import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  BedDouble,
  Bath,
  IndianRupee,
  CalendarDays,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

export default function Availability() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  // ==========================================
  // Result State
  // ==========================================

  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // ==========================================
  // Today's Date
  // ==========================================

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // Frontend Validation
  // ==========================================

  const validateForm = () => {
    if (!formData.checkIn) {
      setError("Please select a check-in date.");
      return false;
    }

    if (!formData.checkOut) {
      setError("Please select a check-out date.");
      return false;
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
      return false;
    }

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date.");
      return false;
    }

    const guestCount = Number(formData.guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1
    ) {
      setError("Please select a valid number of guests.");
      return false;
    }

    return true;
  };

  // ==========================================
  // Check Availability
  // ==========================================

  const handleCheckAvailability = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setAvailableRooms([]);
    setHasSearched(false);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/availability/check",
        {
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: Number(formData.guests),
        }
      );

      const responseData = response.data;

      setAvailableRooms(responseData.data || []);

      setMessage(
        responseData.message ||
          "Availability checked successfully."
      );

      setHasSearched(true);
    } catch (err) {
      console.error(
        "Availability Check Error:",
        err
      );

      setAvailableRooms([]);
      setHasSearched(true);

      setError(
        err.response?.data?.message ||
          "Unable to check room availability. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Book Selected Room
  // ==========================================

  const handleBookRoom = (room) => {
    navigate("/booking", {
      state: {
        roomId: room._id,
        roomName: room.name,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
      },
    });
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section
      className={`pt-32 pb-20 px-5 min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        {/* ======================================
            Page Heading
        ====================================== */}

        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-teal-600 font-semibold uppercase tracking-wider">
            <CalendarDays size={18} />
            Availability
          </span>

          <h1
            className={`text-3xl md:text-5xl font-bold mt-3 ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Check Room Availability
          </h1>

          <p
            className={`mt-4 max-w-2xl mx-auto leading-7 ${
              darkMode
                ? "text-slate-300"
                : "text-slate-600"
            }`}
          >
            Select your preferred dates and number of
            guests to find rooms available for your stay
            at Trishul Homestay.
          </p>
        </div>

        {/* ======================================
            Search Form
        ====================================== */}

        <form
          onSubmit={handleCheckAvailability}
          className={`rounded-3xl shadow-lg p-6 md:p-8 border ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6">

            {/* Check-In */}

            <div>
              <label
                htmlFor="checkIn"
                className="flex items-center gap-2 mb-2 font-semibold"
              >
                <CalendarDays
                  size={18}
                  className="text-teal-600"
                />

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
                className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
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
                className="flex items-center gap-2 mb-2 font-semibold"
              >
                <CalendarDays
                  size={18}
                  className="text-teal-600"
                />

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
                className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
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
                className="flex items-center gap-2 mb-2 font-semibold"
              >
                <Users
                  size={18}
                  className="text-teal-600"
                />

                Guests
              </label>

              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
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
          </div>

          {/* Error */}

          {error && (
            <div
              className={`mt-6 flex items-start gap-3 rounded-xl px-4 py-3 border ${
                darkMode
                  ? "bg-red-950/40 border-red-800 text-red-300"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <AlertCircle
                size={20}
                className="shrink-0 mt-0.5"
              />

              <p>{error}</p>
            </div>
          )}

          {/* Search Button */}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full md:w-auto bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Checking Availability...
              </>
            ) : (
              <>
                <Search size={20} />

                Check Availability
              </>
            )}
          </button>
        </form>

        {/* ======================================
            Loading Result
        ====================================== */}

        {loading && (
          <div className="py-16 flex flex-col items-center justify-center">
            <Loader2
              size={42}
              className="animate-spin text-teal-600"
            />

            <p
              className={`mt-4 ${
                darkMode
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              Searching for available rooms...
            </p>
          </div>
        )}

        {/* ======================================
            Search Results
        ====================================== */}

        {!loading &&
          hasSearched &&
          !error &&
          availableRooms.length > 0 && (
            <div className="mt-14">

              {/* Result Header */}

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-teal-600 font-semibold mb-2">
                    <CheckCircle2 size={20} />

                    Rooms Available
                  </div>

                  <h2
                    className={`text-2xl md:text-3xl font-bold ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    Available Rooms
                  </h2>

                  <p
                    className={`mt-2 ${
                      darkMode
                        ? "text-slate-300"
                        : "text-slate-600"
                    }`}
                  >
                    {message}
                  </p>
                </div>

                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    darkMode
                      ? "bg-slate-800 text-slate-300"
                      : "bg-white text-slate-600 shadow-sm"
                  }`}
                >
                  <span className="font-semibold">
                    {formData.checkIn}
                  </span>

                  {" → "}

                  <span className="font-semibold">
                    {formData.checkOut}
                  </span>

                  {" • "}

                  {formData.guests}{" "}
                  {Number(formData.guests) === 1
                    ? "Guest"
                    : "Guests"}
                </div>
              </div>

              {/* Rooms Grid */}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableRooms.map((room) => (
                  <article
                    key={room._id}
                    className={`rounded-3xl overflow-hidden border shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      darkMode
                        ? "bg-slate-800 border-slate-700"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    {/* Room Image */}

                    <div className="h-56 overflow-hidden bg-slate-200">
                      {room.image ? (
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center ${
                            darkMode
                              ? "bg-slate-700 text-slate-400"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <BedDouble size={48} />
                        </div>
                      )}
                    </div>

                    {/* Room Content */}

                    <div className="p-6">
                      <h3
                        className={`text-xl font-bold ${
                          darkMode
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {room.name}
                      </h3>

                      {room.description && (
                        <p
                          className={`mt-3 text-sm leading-6 line-clamp-3 ${
                            darkMode
                              ? "text-slate-300"
                              : "text-slate-600"
                          }`}
                        >
                          {room.description}
                        </p>
                      )}

                      {/* Room Details */}

                      <div
                        className={`grid grid-cols-3 gap-3 mt-5 py-4 border-y ${
                          darkMode
                            ? "border-slate-700"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="text-center">
                          <Users
                            size={19}
                            className="mx-auto text-teal-600"
                          />

                          <p className="text-xs mt-1">
                            {room.guests} Guests
                          </p>
                        </div>

                        <div className="text-center">
                          <BedDouble
                            size={19}
                            className="mx-auto text-teal-600"
                          />

                          <p className="text-xs mt-1">
                            {room.beds || 0} Beds
                          </p>
                        </div>

                        <div className="text-center">
                          <Bath
                            size={19}
                            className="mx-auto text-teal-600"
                          />

                          <p className="text-xs mt-1">
                            {room.bathrooms || 0} Bath
                          </p>
                        </div>
                      </div>

                      {/* Price */}

                      <div className="flex items-end justify-between mt-5 gap-4">
                        <div>
                          <p
                            className={`text-xs ${
                              darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            Starting from
                          </p>

                          <div className="flex items-center mt-1">
                            <IndianRupee
                              size={20}
                              className="text-teal-600"
                            />

                            <span className="text-2xl font-bold text-teal-600">
                              {Number(
                                room.price || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </span>

                            <span
                              className={`text-sm ml-1 ${
                                darkMode
                                  ? "text-slate-400"
                                  : "text-slate-500"
                              }`}
                            >
                              / night
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Book Button */}

                      <button
                        type="button"
                        onClick={() =>
                          handleBookRoom(room)
                        }
                        className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                      >
                        Book This Room

                        <ArrowRight size={19} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        {/* ======================================
            No Rooms Available
        ====================================== */}

        {!loading &&
          hasSearched &&
          !error &&
          availableRooms.length === 0 && (
            <div
              className={`mt-14 text-center rounded-3xl border p-10 md:p-14 ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  darkMode
                    ? "bg-slate-700"
                    : "bg-slate-100"
                }`}
              >
                <BedDouble
                  size={30}
                  className="text-teal-600"
                />
              </div>

              <h2 className="text-2xl font-bold mt-5">
                No Rooms Available
              </h2>

              <p
                className={`mt-3 max-w-xl mx-auto ${
                  darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                }`}
              >
                {message ||
                  "No rooms are available for the selected dates and number of guests. Please try different dates."}
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    checkIn: "",
                    checkOut: "",
                    guests: "1",
                  });

                  setAvailableRooms([]);
                  setHasSearched(false);
                  setMessage("");
                  setError("");

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="mt-6 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Try Different Dates
              </button>
            </div>
          )}
      </div>
    </section>
  );
}