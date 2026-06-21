import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`mt-20 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-2xl font-bold mb-4">
            Trishul Homestay
          </h3>

          <p
            className={
              darkMode ? "text-slate-300" : "text-slate-600"
            }
          >
            Experience nature, comfort and authentic
            hospitality with direct booking benefits.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul
            className={`space-y-2 ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <li>Home</li>
            <li>Rooms</li>
            <li>Availability</li>
            <li>Book Now</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <ul
            className={`space-y-2 ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <li>+91 9876543210</li>
            <li>info@trishulhomestay.com</li>
            <li>Uttarakhand, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <p
            className={
              darkMode ? "text-slate-300" : "text-slate-600"
            }
          >
            Facebook • Instagram • WhatsApp
          </p>
        </div>

      </div>

      <div
        className={`py-5 text-center ${
          darkMode
            ? "border-t border-slate-800 text-slate-400"
            : "border-t border-slate-300 text-slate-500"
        }`}
      >
        © 2026 Trishul Homestay Direct Booking Engine
      </div>
    </footer>
  );
}