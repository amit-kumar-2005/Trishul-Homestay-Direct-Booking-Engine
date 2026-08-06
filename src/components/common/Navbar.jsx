import { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Home,
  BedDouble,
  CalendarDays,
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  // =========================================
  // Role Based Dashboard Path
  // =========================================

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : "/dashboard";

  // =========================================
  // Navigation Link Styling
  // =========================================

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 transition font-medium ${
      isActive
        ? "text-teal-600"
        : darkMode
        ? "text-gray-200 hover:text-teal-500"
        : "text-slate-700 hover:text-teal-600"
    }`;

  // =========================================
  // Logout
  // =========================================

  const handleLogout = async () => {
    try {
      await logout();

      setIsOpen(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm border-b transition-all ${
        darkMode
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">

        {/* =====================================
            Logo
        ===================================== */}

        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide"
        >
          <span
            className={
              darkMode
                ? "text-white"
                : "text-slate-900"
            }
          >
            TRISHUL{" "}
          </span>

          <span className="text-teal-600">
            HOMESTAY
          </span>
        </Link>

        {/* =====================================
            Desktop Navigation
        ===================================== */}

        <nav className="hidden lg:flex items-center gap-7">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            <Home size={18} />
            Home
          </NavLink>

          <NavLink
            to="/rooms"
            className={navLinkClass}
          >
            <BedDouble size={18} />
            Rooms
          </NavLink>

          <NavLink
            to="/availability"
            className={navLinkClass}
          >
            <CalendarDays size={18} />
            Availability
          </NavLink>

          <NavLink
            to="/booking"
            className={navLinkClass}
          >
            <BookOpen size={18} />
            Book Now
          </NavLink>

          {/* ===================================
              Role Based Dashboard Link
          =================================== */}

          {user && (
            <NavLink
              to={dashboardPath}
              className={navLinkClass}
            >
              <LayoutDashboard size={18} />

              {user.role === "admin"
                ? "Admin Dashboard"
                : "Dashboard"}
            </NavLink>
          )}
        </nav>

        {/* =====================================
            Desktop Right Section
        ===================================== */}

        <div className="hidden lg:flex items-center gap-4">

          {/* Theme Toggle */}

          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-600 text-white hover:scale-105 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* ===================================
              Logged In User
          =================================== */}

          {user ? (
            <>
              <div className="text-right">

                <p
                  className={`font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  {user.email}
                </p>

                {/* Admin Role Indicator */}

                {user.role === "admin" && (
                  <p className="mt-0.5 text-[11px] font-semibold text-teal-600">
                    Administrator
                  </p>
                )}

              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} />

                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <Link
                to="/login"
                className="flex items-center gap-2 text-teal-600 font-medium"
              >
                <LogIn size={18} />

                Login
              </Link>

              {/* Register */}

              <Link
                to="/register"
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
              >
                <UserPlus size={18} />

                Register
              </Link>
            </>
          )}

        </div>

        {/* =====================================
            Mobile Buttons
        ===================================== */}

        <div className="lg:hidden flex items-center gap-3">

          {/* Mobile Theme Toggle */}

          <button
            type="button"
            onClick={toggleTheme}
            className="text-teal-600"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={24} />
            ) : (
              <Moon size={24} />
            )}
          </button>

          {/* Mobile Menu Toggle */}

          <button
            type="button"
            onClick={() =>
              setIsOpen(!isOpen)
            }
            className={
              darkMode
                ? "text-white"
                : "text-black"
            }
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>
      </div>

      {/* =====================================
          Mobile Menu
      ===================================== */}

      {isOpen && (
        <div
          className={`lg:hidden border-t ${
            darkMode
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <nav className="flex flex-col p-5 gap-5">

            {/* Home */}

            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() =>
                setIsOpen(false)
              }
            >
              <Home size={18} />
              Home
            </NavLink>

            {/* Rooms */}

            <NavLink
              to="/rooms"
              className={navLinkClass}
              onClick={() =>
                setIsOpen(false)
              }
            >
              <BedDouble size={18} />
              Rooms
            </NavLink>

            {/* Availability */}

            <NavLink
              to="/availability"
              className={navLinkClass}
              onClick={() =>
                setIsOpen(false)
              }
            >
              <CalendarDays size={18} />
              Availability
            </NavLink>

            {/* Book Now */}

            <NavLink
              to="/booking"
              className={navLinkClass}
              onClick={() =>
                setIsOpen(false)
              }
            >
              <BookOpen size={18} />
              Book Now
            </NavLink>

            {/* =================================
                Role Based Mobile Dashboard
            ================================= */}

            {user && (
              <NavLink
                to={dashboardPath}
                className={navLinkClass}
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <LayoutDashboard size={18} />

                {user.role === "admin"
                  ? "Admin Dashboard"
                  : "Dashboard"}
              </NavLink>
            )}

            <hr
              className={
                darkMode
                  ? "border-slate-700"
                  : "border-slate-200"
              }
            />

            {/* =================================
                Mobile User Section
            ================================= */}

            {user ? (
              <>
                <div>

                  <p
                    className={`font-semibold ${
                      darkMode
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-500 break-all">
                    {user.email}
                  </p>

                  {user.role === "admin" && (
                    <p className="mt-1 text-xs font-semibold text-teal-600">
                      Administrator
                    </p>
                  )}

                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  <LogOut size={18} />

                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Mobile Login */}

                <Link
                  to="/login"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center gap-2 text-teal-600 font-medium"
                >
                  <LogIn size={18} />

                  Login
                </Link>

                {/* Mobile Register */}

                <Link
                  to="/register"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg justify-center"
                >
                  <UserPlus size={18} />

                  Register
                </Link>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}