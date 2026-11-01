
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  const linkClass = `transition-colors duration-200 hover:text-teal-600 ${
    darkMode ? "text-slate-300" : "text-slate-600"
  }`;

  return (
    <footer
      className={`mt-20 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
            Trishul Homestay
          </h3>

          <p className={linkClass}>
            Experience nature, comfort and authentic
            hospitality with direct booking benefits.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>
              <Link to="/" className={linkClass}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/rooms" className={linkClass}>
                Rooms
              </Link>
            </li>

            <li>
              <Link to="/availability" className={linkClass}>
                Availability
              </Link>
            </li>

            <li>
              <Link to="/booking" className={linkClass}>
                Book Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div id="contact" className="scroll-mt-24">
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <ul className="space-y-2">
            <li>
              <a
                href="tel:+917462854190"
                className={linkClass}
              >
                +91 7462854190
              </a>
            </li>

            <li>
              <a
                href="mailto:info@trishulhomestay.com"
                className={linkClass}
              >
                info@trishulhomestay.com
              </a>
            </li>

            <li className={linkClass}>
              Uttarakhand, India
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/917462854190"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              WhatsApp
            </a>
          </div>

          <p className={`mt-3 text-sm ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>
            Connect with us for booking enquiries.
          </p>
        </div>

      </div>

      {/* Copyright */}
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
