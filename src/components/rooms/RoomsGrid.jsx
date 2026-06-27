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
        const response = await api.get("/rooms");
        setRooms(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold py-10">
        Loading rooms...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        {error}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </div>
  );
}