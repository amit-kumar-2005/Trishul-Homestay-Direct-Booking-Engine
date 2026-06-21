import { useTheme } from "../../context/ThemeContext";

export default function BookingBar() {
  const { darkMode } = useTheme();

  return (
    <section className="relative mt-0 z-20">
      <div className="max-w-7xl mx-auto px-6">

        <div
          className={`rounded-3xl shadow-xl p-8 ${
            darkMode
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-900"
          }`}
        >

          <div className="grid md:grid-cols-5 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Check-In
              </label>

              <input
                type="date"
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Check-Out
              </label>

              <input
                type="date"
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Guests
              </label>

              <select
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Room Type
              </label>

              <select
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                <option>Standard Room</option>
                <option>Deluxe Cottage</option>
                <option>Family Suite</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition">
                Check Availability
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}