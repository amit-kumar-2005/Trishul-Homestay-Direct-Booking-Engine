import { useEffect, useState } from "react";
import api from "../../services/api";
import BookingFields from "./BookingFields";
import BookingMessages from "./BookingMessages";

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
      <BookingMessages
        message={message}
        error={error}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <BookingFields
          darkMode={darkMode}
          rooms={rooms}
          formData={formData}
          handleChange={handleChange}
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