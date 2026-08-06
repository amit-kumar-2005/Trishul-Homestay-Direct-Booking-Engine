import { useEffect, useState } from "react";
import api from "../../services/api";
import RoomCard from "./RoomCard";

export default function RoomsGrid() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/rooms");
        setRooms(response.data.data || []);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg font-semibold text-slate-600">
          Loading rooms...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State (Week 8 Requirement)
  if (rooms.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            No Rooms Available
          </h2>

          <p className="mt-3 text-slate-500">
            Rooms will appear here once they are added.
          </p>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard
          key={room._id || room.id}
          room={room}
        />
      ))}
    </div>
  );
}