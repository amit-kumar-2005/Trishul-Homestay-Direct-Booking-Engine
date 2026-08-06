import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CalendarDays,
  Users,
  BedDouble,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

export default function BookingForm({ darkMode }) {
  const location = useLocation();

  // ==========================================
  // Availability Page Navigation Data
  // ==========================================

  const bookingState = location.state || {};

  // ==========================================
  // Rooms State
  // ==========================================

  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  // ==========================================
  // Booking Form State
  // ==========================================

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    roomId: bookingState.roomId || "",
    guests: bookingState.guests || 1,
    checkIn: bookingState.checkIn || "",
    checkOut: bookingState.checkOut || "",
    specialRequest: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // Get Today's Date
  // ==========================================

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  // ==========================================
  // Fetch Rooms
  // ==========================================

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);

        const response = await api.get("/rooms");

        const fetchedRooms =
          response.data?.data || [];

        setRooms(fetchedRooms);

        /*
          IMPORTANT:

          We intentionally DO NOT automatically select
          the first room here.

          If user comes from Availability page,
          bookingState.roomId is already selected.

          If user opens Booking page directly,
          roomId remains empty and user must select
          the room manually.
        */

        if (bookingState.roomId) {
          const selectedRoomExists =
            fetchedRooms.some(
              (room) =>
                room._id === bookingState.roomId
            );

          if (!selectedRoomExists) {
            setFormData((prev) => ({
              ...prev,
              roomId: "",
            }));
          }
        }
      } catch (err) {
        console.error(
          "Fetch Rooms Error:",
          err
        );

        setError(
          "Unable to load rooms. Please try again."
        );
      } finally {
        setRoomsLoading(false);
      }
    };

    fetchRooms();
  }, [bookingState.roomId]);

  // ==========================================
  // Sync Navigation State
  // ==========================================

  useEffect(() => {
    if (!location.state) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      roomId:
        location.state.roomId ||
        prev.roomId,

      guests:
        location.state.guests ||
        prev.guests,

      checkIn:
        location.state.checkIn ||
        prev.checkIn,

      checkOut:
        location.state.checkOut ||
        prev.checkOut,
    }));
  }, [location.state]);

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
    setMessage("");
  };

  // ==========================================
  // Frontend Validation
  // ==========================================

  const validateForm = () => {
    if (!formData.guestName.trim()) {
      setError(
        "Please enter your full name."
      );

      return false;
    }

    if (!formData.email.trim()) {
      setError(
        "Please enter your email address."
      );

      return false;
    }

    if (!formData.phone.trim()) {
      setError(
        "Please enter your phone number."
      );

      return false;
    }

    if (!formData.roomId) {
      setError(
        "Please select a room."
      );

      return false;
    }

    const guestCount =
      Number(formData.guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1
    ) {
      setError(
        "Number of guests must be at least 1."
      );

      return false;
    }

    if (!formData.checkIn) {
      setError(
        "Please select a check-in date."
      );

      return false;
    }

    if (!formData.checkOut) {
      setError(
        "Please select a check-out date."
      );

      return false;
    }

    const checkInDate = new Date(
      `${formData.checkIn}T00:00:00`
    );

    const checkOutDate = new Date(
      `${formData.checkOut}T00:00:00`
    );

    const todayDate = new Date(
      `${today}T00:00:00`
    );

    if (checkInDate < todayDate) {
      setError(
        "Check-in date cannot be in the past."
      );

      return false;
    }

    if (checkOutDate <= checkInDate) {
      setError(
        "Check-out date must be after check-in date."
      );

      return false;
    }

    // ==========================================
    // Selected Room Capacity Validation
    // ==========================================

    const selectedRoom = rooms.find(
      (room) =>
        room._id === formData.roomId
    );

    if (
      selectedRoom &&
      guestCount >
        Number(selectedRoom.guests)
    ) {
      setError(
        `${selectedRoom.name} allows a maximum of ${selectedRoom.guests} guest(s).`
      );

      return false;
    }

    return true;
  };

  // ==========================================
  // Submit Booking
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/bookings",
        {
          roomId: formData.roomId,

          guestName:
            formData.guestName.trim(),

          email:
            formData.email.trim(),

          phone:
            formData.phone.trim(),

          guests:
            Number(formData.guests),

          checkIn:
            formData.checkIn,

          checkOut:
            formData.checkOut,

          specialRequest:
            formData.specialRequest.trim(),
        }
      );

      setMessage(
        response.data?.message ||
          "Booking request submitted successfully."
      );

      // ========================================
      // Reset Form After Successful Booking
      // ========================================

      setFormData({
        guestName: "",
        email: "",
        phone: "",
        roomId: "",
        guests: 1,
        checkIn: "",
        checkOut: "",
        specialRequest: "",
      });
    } catch (err) {
      console.error(
        "Booking Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Booking request failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Selected Room
  // ==========================================

  const selectedRoom = rooms.find(
    (room) =>
      room._id === formData.roomId
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl shadow-lg p-6 md:p-8 border ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      }`}
    >
      {/* ======================================
          Availability Selection Information
      ====================================== */}

      {bookingState.roomId && (
        <div
          className={`mb-7 rounded-2xl border p-4 ${
            darkMode
              ? "bg-teal-950/30 border-teal-800"
              : "bg-teal-50 border-teal-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={22}
              className="text-teal-600 shrink-0 mt-0.5"
            />

            <div>
              <p
                className={`font-semibold ${
                  darkMode
                    ? "text-teal-300"
                    : "text-teal-800"
                }`}
              >
                Your available room selection
                has been added automatically.
              </p>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                }`}
              >
                Please enter your contact
                information and review the
                booking details before
                submitting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================
          Success Message
      ====================================== */}

      {message && (
        <div
          className={`mb-6 rounded-xl border px-4 py-3 flex items-start gap-3 ${
            darkMode
              ? "bg-green-950/40 border-green-800 text-green-300"
              : "bg-green-50 border-green-200 text-green-700"
          }`}
        >
          <CheckCircle2
            size={20}
            className="shrink-0 mt-0.5"
          />

          <span>{message}</span>
        </div>
      )}

      {/* ======================================
          Error Message
      ====================================== */}

      {error && (
        <div
          className={`mb-6 rounded-xl border px-4 py-3 flex items-start gap-3 ${
            darkMode
              ? "bg-red-950/40 border-red-800 text-red-300"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <AlertCircle
            size={20}
            className="shrink-0 mt-0.5"
          />

          <span>{error}</span>
        </div>
      )}

      {/* ======================================
          Form Grid
      ====================================== */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}

        <div>
          <label
            htmlFor="guestName"
            className="block mb-2 font-medium"
          >
            Full Name
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            id="guestName"
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          />
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium"
          >
            Email Address
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
            className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          />
        </div>

        {/* Phone */}

        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-medium"
          >
            Phone Number
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
            className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          />
        </div>

        {/* Select Room */}

        <div>
          <label
            htmlFor="roomId"
            className="flex items-center gap-2 mb-2 font-medium"
          >
            <BedDouble
              size={18}
              className="text-teal-600"
            />

            Select Room

            <span className="text-red-500">
              *
            </span>
          </label>

          <select
            id="roomId"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            disabled={roomsLoading}
            required
            className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 disabled:opacity-60 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          >
            <option value="">
              {roomsLoading
                ? "Loading rooms..."
                : "Choose a room"}
            </option>

            {rooms.map((room) => (
              <option
                key={room._id}
                value={room._id}
              >
                {room.name}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Guests */}

        <div>
          <label
            htmlFor="guests"
            className="flex items-center gap-2 mb-2 font-medium"
          >
            <Users
              size={18}
              className="text-teal-600"
            />

            Number of Guests

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            id="guests"
            type="number"
            name="guests"
            min="1"
            max={
              selectedRoom?.guests || undefined
            }
            value={formData.guests}
            onChange={handleChange}
            required
            className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          />

          {selectedRoom && (
            <p
              className={`text-xs mt-2 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Maximum capacity:{" "}
              {selectedRoom.guests} guest(s)
            </p>
          )}
        </div>

        {/* Check-In */}

        <div>
          <label
            htmlFor="checkIn"
            className="flex items-center gap-2 mb-2 font-medium"
          >
            <CalendarDays
              size={18}
              className="text-teal-600"
            />

            Check-In Date

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            id="checkIn"
            type="date"
            name="checkIn"
            min={today}
            value={formData.checkIn}
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
            className="flex items-center gap-2 mb-2 font-medium"
          >
            <CalendarDays
              size={18}
              className="text-teal-600"
            />

            Check-Out Date

            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            id="checkOut"
            type="date"
            name="checkOut"
            min={formData.checkIn || today}
            value={formData.checkOut}
            onChange={handleChange}
            required
            className={`w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          />
        </div>
      </div>

      {/* ======================================
          Special Request
      ====================================== */}

      <div className="mt-6">
        <label
          htmlFor="specialRequest"
          className="block mb-2 font-medium"
        >
          Special Request
        </label>

        <textarea
          id="specialRequest"
          name="specialRequest"
          rows="4"
          value={formData.specialRequest}
          onChange={handleChange}
          placeholder="Any special request..."
          className={`w-full border rounded-xl px-4 py-3 outline-none resize-y transition focus:ring-2 focus:ring-teal-500 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              : "bg-white border-slate-300 text-slate-900"
          }`}
        />
      </div>

      {/* ======================================
          Submit Button
      ====================================== */}

      <button
        type="submit"
        disabled={
          loading ||
          roomsLoading
        }
        className="mt-8 w-full md:w-auto bg-teal-700 hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />

            Processing Booking...
          </>
        ) : (
          "Submit Booking Request"
        )}
      </button>
    </form>
  );
}