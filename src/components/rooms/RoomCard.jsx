
import { useNavigate } from "react-router-dom";

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

  const handleViewDetails = () => {
    navigate(`/rooms/${room._id}`);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition">

      {/* Room Image */}
      <img
        src={roomImages[room.image] || standardRoom}
        alt={room.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        {/* Room Name and Price */}
        <div className="flex justify-between items-center mb-3 gap-3">
          <h3 className="text-2xl font-bold">
            {room.name}
          </h3>

          <span className="text-teal-700 font-bold whitespace-nowrap">
            ₹{Number(room.price).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Room Information */}
        <p className="text-gray-500 mb-3">
          {room.guests} Guests • {room.beds} Bed • {room.bathrooms} Bathroom
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-5">
          {room.description}
        </p>

        {/* View Details Button */}
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
