import RoomsGrid from "../rooms/RoomsGrid";

export default function RoomsPreview() {
  return (
    <section className="py-24 px-6 bg-slate-50">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Featured Rooms
          </span>

          <h2 className="text-5xl font-bold mt-3">
            Choose Your Perfect Stay
          </h2>

        </div>

        <RoomsGrid />

      </div>

    </section>
  );
}