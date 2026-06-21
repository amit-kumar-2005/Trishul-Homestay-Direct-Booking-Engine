import RoomsGrid from "../components/rooms/RoomsGrid";
import { useTheme } from "../context/ThemeContext";

export default function Rooms() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`pt-32 pb-20 px-5 min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Our Rooms
          </span>

          <h1
            className={`text-3xl md:text-5xl font-bold mt-3 ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Find Your Perfect Stay
          </h1>

          <p
            className={`mt-4 max-w-2xl mx-auto ${
              darkMode
                ? "text-slate-300"
                : "text-slate-600"
            }`}
          >
            Choose from our comfortable and eco-friendly room options.
            Enjoy a peaceful stay surrounded by nature.
          </p>

        </div>

        <RoomsGrid />

      </div>
    </section>
  );
}