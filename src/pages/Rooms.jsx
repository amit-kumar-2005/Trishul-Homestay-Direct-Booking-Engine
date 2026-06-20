import RoomsGrid from "../components/rooms/RoomsGrid";

export default function Rooms() {
  return (
    <section className="pt-32 pb-20 px-5 bg-slate-50 min-h-screen">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Our Rooms
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mt-3">
            Find Your Perfect Stay
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Choose from our comfortable and eco-friendly room options.
            Enjoy a peaceful stay surrounded by nature.
          </p>

        </div>

        <RoomsGrid />

      </div>

    </section>
  );
}