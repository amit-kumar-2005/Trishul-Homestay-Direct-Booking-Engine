import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="text-3xl font-extrabold">
          <span className="text-slate-900">TRISHUL </span>
          <span className="text-teal-700">HOMESTAY</span>
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-teal-700 font-semibold"
                : "text-slate-700 hover:text-teal-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive
                ? "text-teal-700 font-semibold"
                : "text-slate-700 hover:text-teal-700"
            }
          >
            Rooms
          </NavLink>

          <NavLink
            to="/availability"
            className={({ isActive }) =>
              isActive
                ? "text-teal-700 font-semibold"
                : "text-slate-700 hover:text-teal-700"
            }
          >
            Availability
          </NavLink>

          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive
                ? "text-teal-700 font-semibold"
                : "text-slate-700 hover:text-teal-700"
            }
          >
            Book Now
          </NavLink>

        </nav>

      </div>
    </header>
  );
}