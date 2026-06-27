import { useTheme } from "../context/ThemeContext";
import BookingForm from "../components/booking/BookingForm";

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

        <BookingForm darkMode={darkMode} />
      </div>
    </section>
  );
}