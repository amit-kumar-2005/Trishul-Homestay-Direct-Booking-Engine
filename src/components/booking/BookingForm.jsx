import { useEffect, useState } from "react";
import api from "../../services/api";

export default function BookingForm({ darkMode }) {
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    roomId: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    specialRequest: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get("/rooms");

        setRooms(response.data.data);

        if (response.data.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            roomId: response.data.data[0].id,
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.guestName ||
      !formData.email ||
      !formData.phone ||
      !formData.roomId ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        roomId: Number(formData.roomId),
        guestName: formData.guestName,
        email: formData.email,
        phone: formData.phone,
        guests: Number(formData.guests),
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        specialRequest: formData.specialRequest,
      });

      setMessage(response.data.message);

      setFormData({
        guestName: "",
        email: "",
        phone: "",
        roomId: rooms.length ? rooms[0].id : "",
        guests: 1,
        checkIn: "",
        checkOut: "",
        specialRequest: "",
      });
    } catch (err) {
      console.error(err);
      setError("Booking request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl shadow-lg p-8 ${
        darkMode ? "bg-slate-800" : "bg-white"
      }`}
    >
      {message && (
        <div className="mb-6 rounded-lg bg-green-100 text-green-700 px-4 py-3">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          />
        </div>

                <div>
          <label className="block mb-2 font-medium">
            Select Room
          </label>

          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Number of Guests
          </label>

          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Check-In Date
          </label>

          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Check-Out Date
          </label>

          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className={`w-full border rounded-xl px-4 py-3 ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-slate-300"
            }`}
          />
        </div>

      </div>

      <div className="mt-6">
        <label className="block mb-2 font-medium">
          Special Request
        </label>

        <textarea
          name="specialRequest"
          rows="4"
          value={formData.specialRequest}
          onChange={handleChange}
          placeholder="Any special request..."
          className={`w-full border rounded-xl px-4 py-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-slate-300"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full md:w-auto bg-teal-700 text-white px-8 py-4 rounded-full hover:bg-teal-800 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Booking Request"}
      </button>

    </form>
  );
}