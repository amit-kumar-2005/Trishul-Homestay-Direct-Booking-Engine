import { useTheme } from "../context/ThemeContext";

export default function Booking() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`pt-32 pb-20 px-5 min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Booking Inquiry
          </span>

          <h1
            className={`text-3xl md:text-5xl font-bold mt-3 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Reserve Your Stay
          </h1>

          <p
            className={`mt-4 max-w-2xl mx-auto ${
              darkMode
                ? "text-slate-300"
                : "text-slate-600"
            }`}
          >
            Fill out the form below and our team will contact you
            shortly to confirm availability and booking details.
          </p>

        </div>

        <div
          className={`rounded-3xl shadow-lg p-8 ${
            darkMode
              ? "bg-slate-800"
              : "bg-white"
          }`}
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
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
                <option>5 Guests</option>
              </select>
            </div>

          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Special Request
            </label>

            <textarea
              rows="5"
              placeholder="Write your message..."
              className={`w-full border rounded-xl px-4 py-3 ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  : "bg-white border-slate-300 text-slate-900"
              }`}
            ></textarea>
          </div>

          <button className="mt-8 w-full md:w-auto bg-teal-700 text-white px-8 py-4 rounded-full hover:bg-teal-800 transition">
            Submit Booking Request
          </button>

        </div>

      </div>
    </section>
  );
}