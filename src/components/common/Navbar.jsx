import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-teal-700 font-semibold"
      : "text-slate-700 hover:text-teal-700";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-all ${
        darkMode ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="text-2xl md:text-3xl font-extrabold">
          <span className={darkMode ? "text-white" : "text-slate-900"}>
            TRISHUL{" "}
          </span>
          <span className="text-teal-700">
            HOMESTAY
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/rooms" className={navLinkClass}>
            Rooms
          </NavLink>

          <NavLink to="/availability" className={navLinkClass}>
            Availability
          </NavLink>

          <NavLink to="/booking" className={navLinkClass}>
            Book Now
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-teal-700 text-white"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-3 md:hidden">

          <button
            onClick={toggleTheme}
            className="text-2xl"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className={`text-3xl ${
              darkMode ? "text-white" : "text-black"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden border-t shadow-md ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white"
          }`}
        >
          <nav className="flex flex-col p-5 gap-4">

            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/rooms"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Rooms
            </NavLink>

            <NavLink
              to="/availability"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Availability
            </NavLink>

            <NavLink
              to="/booking"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </NavLink>

          </nav>
        </div>
      )}
    </header>
  );
}