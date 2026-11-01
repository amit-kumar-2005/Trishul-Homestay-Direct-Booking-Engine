
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

import standardRoom from "../assets/images/room-standard.jpg";
import deluxeRoom from "../assets/images/room-deluxe.jpg";
import familyRoom from "../assets/images/room-family.jpg";

import {
  Users,
  BedDouble,
  Bath,
  ArrowLeft,
  CheckCircle,
  CalendarCheck,
} from "lucide-react";

const roomImages = {
  "/images/standard-room.jpg": standardRoom,
  "/images/deluxe-room.jpg": deluxeRoom,
  "/images/family-suite.jpg": familyRoom,
};

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/rooms/${id}`);

        setRoom(response.data.data);
      } catch (err) {
        console.error("Room Details Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load room details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomDetails();
    }
  }, [id]);

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        roomId: room._id,
      },
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageBackground = darkMode
    ? "bg-slate-900 text-white"
    : "bg-slate-50 text-slate-900";

  // Loading State
  if (loading) {
    return (
      <section className={`min-h-screen pt-32 pb-20 ${pageBackground}`}>
        <div className="flex justify-center items-center py-24">
          <p className="text-lg font-semibold">
            Loading room details...
          </p>
        </div>
      </section>
    );
  }

  // Error State
  if (error || !room) {
    return (
      <section className={`min-h-screen pt-32 pb-20 ${pageBackground}`}>
        <div className="max-w-3xl mx-auto px-6 text-center py-20">
          <h2 className="text-3xl font-bold text-red-500">
            Room Not Found
          </h2>

          <p className="mt-4 text-slate-500">
            {error || "The requested room could not be found."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/rooms")}
            className="mt-8 bg-teal-700 text-white px-8 py-3 rounded-full hover:bg-teal-800 transition"
          >
            Back to Rooms
          </button>
        </div>
      </section>
    );
  }

  const roomImage = roomImages[room.image] || standardRoom;

  return (
    <section className={`min-h-screen pt-32 pb-20 transition-colors duration-300 ${pageBackground}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-800 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Rooms
        </button>

        {/* Room Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Room Image */}
          <div>
            <img
              src={roomImage}
              alt={room.name}
              className="w-full h-[350px] md:h-[500px] object-cover rounded-3xl shadow-xl"
            />
          </div>

          {/* Room Information */}
          <div>
            <div className="flex flex-wrap justify-between items-start gap-4">

              <div>
                <span className="text-teal-600 font-semibold uppercase tracking-wider">
                  Room Details
                </span>

                <h1 className="text-3xl md:text-5xl font-bold mt-3">
                  {room.name}
                </h1>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  room.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {room.isAvailable ? "Available" : "Currently Unavailable"}
              </span>
            </div>

            <p className="text-3xl font-bold text-teal-700 mt-6">
              ₹{Number(room.price).toLocaleString("en-IN")}
              <span className="text-base font-normal text-slate-500">
                {" "} / Night
              </span>
            </p>

            <p className={`mt-6 text-lg leading-relaxed ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}>
              {room.description}
            </p>

            {/* Room Specifications */}
            <div className={`grid grid-cols-3 gap-4 mt-8 p-5 rounded-2xl ${
              darkMode ? "bg-slate-800" : "bg-white shadow-sm"
            }`}>
              <div className="text-center">
                <Users className="mx-auto text-teal-600 mb-2" size={25} />
                <p className="font-bold">{room.guests}</p>
                <p className="text-sm text-slate-500">Guests</p>
              </div>

              <div className="text-center">
                <BedDouble className="mx-auto text-teal-600 mb-2" size={25} />
                <p className="font-bold">{room.beds}</p>
                <p className="text-sm text-slate-500">Beds</p>
              </div>

              <div className="text-center">
                <Bath className="mx-auto text-teal-600 mb-2" size={25} />
                <p className="font-bold">{room.bathrooms}</p>
                <p className="text-sm text-slate-500">Bathrooms</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-5">
                Room Amenities
              </h2>

              {Array.isArray(room.amenities) && room.amenities.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="text-teal-600" size={20} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">
                  Room amenities will be updated soon.
                </p>
              )}
            </div>

            {/* Booking Button */}
            <button
              type="button"
              onClick={handleBooking}
              disabled={!room.isAvailable}
              className="w-full mt-10 flex justify-center items-center gap-3 bg-teal-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-800 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              <CalendarCheck size={21} />
              {room.isAvailable ? "Book This Room" : "Currently Unavailable"}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
