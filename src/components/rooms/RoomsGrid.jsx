import rooms from "../../data/rooms.json";
import RoomCard from "./RoomCard";

export default function RoomsGrid() {
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