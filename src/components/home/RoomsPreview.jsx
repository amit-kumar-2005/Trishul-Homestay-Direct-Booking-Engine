import RoomsGrid from "../rooms/RoomsGrid";
import { useTheme } from "../../context/ThemeContext";

export default function RoomsPreview() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`py-24 px-6 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900"
          : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Featured Rooms
          </span>

          <h2
            className={`text-5xl font-bold mt-3 ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Choose Your Perfect Stay
          </h2>

        </div>

        <RoomsGrid />

      </div>
    </section>
  );
}