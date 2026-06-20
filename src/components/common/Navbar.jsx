import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-teal-700 font-semibold"
      : "text-slate-700 hover:text-teal-700";

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="text-2xl md:text-3xl font-extrabold">
          <span className="text-slate-900">TRISHUL </span>
          <span className="text-teal-700">HOMESTAY</span>
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
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
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