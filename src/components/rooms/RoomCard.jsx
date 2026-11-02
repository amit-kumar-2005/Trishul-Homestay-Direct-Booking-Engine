import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import standardRoom from "../../assets/images/room-standard.jpg";
import deluxeRoom from "../../assets/images/room-deluxe.jpg";
import familyRoom from "../../assets/images/room-family.jpg";

const roomImages = {
  "/images/standard-room.jpg": standardRoom,
  "/images/deluxe-room.jpg": deluxeRoom,
  "/images/family-suite.jpg": familyRoom,
};

export default function RoomCard({ room }) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleViewDetails = () => {
    navigate(`/rooms/${room._id}`);
  };

  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ${
        darkMode
          ? "bg-slate-800 text-white border border-slate-700"
          : "bg-white text-slate-900 border border-slate-200"
      }`}
    >
      <img
        src={roomImages[room.image] || standardRoom}
        alt={room.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center mb-3 gap-3">
          <h3
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {room.name}
          </h3>

          <span className="text-teal-500 font-bold whitespace-nowrap">
            ₹{Number(room.price).toLocaleString("en-IN")}
          </span>
        </div>

        <p
          className={`mb-3 ${
            darkMode ? "text-slate-300" : "text-gray-500"
          }`}
        >
          {room.guests} Guests • {room.beds} Bed • {room.bathrooms} Bathroom
        </p>

        <p
          className={`mb-5 leading-relaxed ${
            darkMode ? "text-slate-300" : "text-gray-600"
          }`}
        >
          {room.description}
        </p>

        <button
          type="button"
          onClick={handleViewDetails}
          className="w-full bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition"
        >
          View Details
        </button>

      </div>
    </div>
  );
}