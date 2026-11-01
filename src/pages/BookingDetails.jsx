
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock3,
  IndianRupee,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { darkMode } = useTheme();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Theme Classes
  // ==========================================

  const pageBg = darkMode
    ? "bg-slate-950 text-white"
    : "bg-slate-50 text-slate-900";

  const cardBg = darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200";

  const innerBg = darkMode
    ? "bg-slate-800"
    : "bg-slate-50";

  const headingText = darkMode
    ? "text-white"
    : "text-slate-900";

  const bodyText = darkMode
    ? "text-slate-300"
    : "text-slate-600";

  const mutedText = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  const divider = darkMode
    ? "border-slate-700"
    : "border-slate-200";

  // ==========================================
  // User / Role
  // ==========================================

  const isAdmin = user?.role === "admin";

  const dashboardPath = isAdmin
    ? "/admin/dashboard"
    : "/dashboard";

  // ==========================================
  // Fetch Booking Details
  // ==========================================

  const fetchBookingDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/bookings/${id}`);

      setBooking(response.data.data);
    } catch (err) {
      console.error("Booking details error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load booking details."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
  }, [id, fetchBookingDetails]);

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  // ==========================================
  // Currency Formatter
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  };

  // ==========================================
  // Number Of Nights
  // ==========================================

  const nights = useMemo(() => {
    if (!booking?.checkIn || !booking?.checkOut) {
      return 0;
    }

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    const difference =
      checkOut.getTime() - checkIn.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    );
  }, [booking]);

  // ==========================================
  // Estimated Total
  // ==========================================

  const estimatedTotal = useMemo(() => {
    const price = Number(booking?.roomId?.price || 0);

    return price * nights;
  }, [booking, nights]);

  // ==========================================
  // Status Styling
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return {
          badge: darkMode
            ? "bg-green-950 text-green-300 border-green-800"
            : "bg-green-100 text-green-700 border-green-200",
          icon: <CircleCheck size={16} className="text-green-500" />,
        };

      case "Completed":
        return {
          badge: darkMode
            ? "bg-blue-950 text-blue-300 border-blue-800"
            : "bg-blue-100 text-blue-700 border-blue-200",
          icon: <CircleCheck size={16} className="text-blue-500" />,
        };

      case "Cancelled":
        return {
          badge: darkMode
            ? "bg-red-950 text-red-300 border-red-800"
            : "bg-red-100 text-red-700 border-red-200",
          icon: <CircleX size={16} className="text-red-500" />,
        };

      default:
        return {
          badge: darkMode
            ? "bg-amber-950 text-amber-300 border-amber-800"
            : "bg-amber-100 text-amber-700 border-amber-200",
          icon: <Clock3 size={16} className="text-amber-500" />,
        };
    }
  };

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <section className={`min-h-[70vh] flex items-center justify-center px-5 ${pageBg}`}>
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            size={38}
            className="animate-spin text-teal-500"
          />

          <p className={bodyText}>
            Loading booking details...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // Error State
  // ==========================================

  if (error || !booking) {
    return (
      <section className={`min-h-[70vh] flex items-center justify-center px-5 ${pageBg}`}>
        <div className={`w-full max-w-lg rounded-2xl border p-8 shadow-sm text-center ${cardBg}`}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <CircleX size={28} className="text-red-600" />
          </div>

          <h1 className={`text-2xl font-bold ${headingText}`}>
            Booking Not Available
          </h1>

          <p className={`mt-3 ${bodyText}`}>
            {error || "Booking could not be found."}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(dashboardPath)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 transition"
            >
              <ArrowLeft size={18} />
              {isAdmin ? "Back to Admin Dashboard" : "Back to Dashboard"}
            </button>

            <button
              type="button"
              onClick={fetchBookingDetails}
              className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 font-semibold transition ${
                darkMode
                  ? "border-slate-600 text-slate-200 hover:bg-slate-800"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const statusStyle = getStatusStyle(booking.status);

  const shortBookingId = booking._id
    ? booking._id.slice(-8).toUpperCase()
    : "N/A";

  return (
    <section className={`min-h-screen py-10 px-5 transition-colors duration-300 ${pageBg}`}>
      <div className="max-w-5xl mx-auto">

        {/* =====================================
            Top Navigation
        ====================================== */}

        <div className="mb-6">
          <Link
            to={dashboardPath}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-500 hover:text-teal-400 hover:underline"
          >
            <ArrowLeft size={18} />

            {isAdmin
              ? "Back to Admin Dashboard"
              : "Back to Dashboard"}
          </Link>
        </div>

        {/* =====================================
            Header
        ====================================== */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-500">
              {isAdmin ? "Admin Booking Details" : "Booking Details"}
            </p>

            <h1 className={`mt-2 text-3xl md:text-4xl font-bold ${headingText}`}>
              {isAdmin ? "Booking Details" : "Your Reservation"}
            </h1>

            <p className={`mt-2 ${bodyText}`}>
              {isAdmin
                ? "Review the complete guest reservation and booking information."
                : "Review your complete Trishul Homestay booking information."}
            </p>
          </div>

          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle.badge}`}
          >
            {statusStyle.icon}
            {booking.status || "Pending"}
          </div>
        </div>

        {/* =====================================
            Main Booking Card
        ====================================== */}

        <div className={`overflow-hidden rounded-2xl border shadow-sm ${cardBg}`}>

          {/* Room Header */}

          <div className={`border-b p-6 md:p-8 ${divider}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950">
                  <BedDouble
                    size={27}
                    className="text-teal-700"
                  />
                </div>

                <div>
                  <p className={`text-xs uppercase tracking-wider ${mutedText}`}>
                    Room
                  </p>

                  <h2 className={`mt-1 text-2xl font-bold ${headingText}`}>
                    {booking.roomId?.name || "Room information unavailable"}
                  </h2>

                  <p className={`mt-2 text-sm ${mutedText}`}>
                    Booking ID: {shortBookingId}
                  </p>
                </div>
              </div>

              <div className={`rounded-xl px-5 py-4 ${innerBg}`}>
                <p className={`text-xs ${mutedText}`}>
                  Booking Requested
                </p>

                <p className={`mt-1 font-semibold ${headingText}`}>
                  {formatDate(booking.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Stay Information */}

          <div className="p-6 md:p-8">
            <h3 className={`text-xl font-bold ${headingText}`}>
              Stay Information
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoBox
                darkMode={darkMode}
                icon={<CalendarDays size={20} />}
                label="Check-In"
                value={formatDate(booking.checkIn)}
              />

              <InfoBox
                darkMode={darkMode}
                icon={<CalendarDays size={20} />}
                label="Check-Out"
                value={formatDate(booking.checkOut)}
              />

              <InfoBox
                darkMode={darkMode}
                icon={<UsersRound size={20} />}
                label="Guests"
                value={`${booking.guests || 0} ${
                  Number(booking.guests) === 1 ? "Guest" : "Guests"
                }`}
              />

              <InfoBox
                darkMode={darkMode}
                icon={<Clock3 size={20} />}
                label="Duration"
                value={`${nights} ${nights === 1 ? "Night" : "Nights"}`}
              />
            </div>
          </div>

          {/* Price Information */}

          <div className={`border-t p-6 md:p-8 ${divider}`}>
            <h3 className={`text-xl font-bold ${headingText}`}>
              Price Summary
            </h3>

            <div className={`mt-5 rounded-xl p-5 ${innerBg}`}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className={`text-sm ${mutedText}`}>
                    Room Price
                  </p>

                  <div className="mt-1 flex items-center">
                    <IndianRupee size={18} className="text-teal-500" />

                    <span className={`text-xl font-bold ${headingText}`}>
                      {Number(booking.roomId?.price || 0).toLocaleString("en-IN")}
                    </span>

                    <span className={`ml-1 text-sm ${mutedText}`}>
                      / night
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className={`text-sm ${mutedText}`}>
                    Estimated Total
                  </p>

                  <p className="mt-1 text-2xl font-bold text-teal-500">
                    {formatCurrency(estimatedTotal)}
                  </p>

                  <p className={`mt-1 text-xs ${mutedText}`}>
                    {nights} {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Information */}

          <div className={`border-t p-6 md:p-8 ${divider}`}>
            <h3 className={`text-xl font-bold ${headingText}`}>
              Guest Information
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <DetailRow
                darkMode={darkMode}
                icon={<UserRound size={20} />}
                label="Guest Name"
                value={booking.guestName || "N/A"}
              />

              <DetailRow
                darkMode={darkMode}
                icon={<Mail size={20} />}
                label="Email Address"
                value={booking.email || "N/A"}
              />

              <DetailRow
                darkMode={darkMode}
                icon={<Phone size={20} />}
                label="Phone Number"
                value={booking.phone || "N/A"}
              />

              <DetailRow
                darkMode={darkMode}
                icon={<UsersRound size={20} />}
                label="Number of Guests"
                value={`${booking.guests || 0}`}
              />
            </div>
          </div>

          {/* Special Request */}

          <div className={`border-t p-6 md:p-8 ${divider}`}>
            <h3 className={`text-xl font-bold ${headingText}`}>
              Special Request
            </h3>

            <div className={`mt-4 rounded-xl border p-5 ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-slate-50"
            }`}>
              <p className={`text-sm leading-6 ${bodyText}`}>
                {booking.specialRequest?.trim()
                  ? booking.specialRequest
                  : "No special request was added for this booking."}
              </p>
            </div>
          </div>

          {/* Booking Status Information */}

          <div className={`border-t p-6 md:p-8 ${divider}`}>
            {booking.status === "Cancelled" ? (
              <StatusMessage
                darkMode={darkMode}
                type="red"
                icon={<CircleX size={22} />}
                title="Booking Cancelled"
                message="This booking has been cancelled and is no longer active."
              />
            ) : booking.status === "Completed" ? (
              <StatusMessage
                darkMode={darkMode}
                type="blue"
                icon={<CircleCheck size={22} />}
                title="Stay Completed"
                message="This booking has been marked as completed."
              />
            ) : booking.status === "Confirmed" ? (
              <StatusMessage
                darkMode={darkMode}
                type="green"
                icon={<ShieldCheck size={22} />}
                title="Booking Confirmed"
                message={
                  isAdmin
                    ? "This reservation has been confirmed."
                    : "Your reservation has been confirmed."
                }
              />
            ) : (
              <StatusMessage
                darkMode={darkMode}
                type="amber"
                icon={<Clock3 size={22} />}
                title="Confirmation Pending"
                message={
                  isAdmin
                    ? "This booking request has been received and is awaiting confirmation."
                    : "Your booking request has been received and is awaiting confirmation."
                }
              />
            )}
          </div>

          {/* Bottom Actions */}

          <div className={`border-t p-6 md:px-8 ${
            darkMode
              ? "border-slate-700 bg-slate-950"
              : "border-slate-200 bg-slate-50"
          }`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">

              <Link
                to={dashboardPath}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 font-semibold transition ${
                  darkMode
                    ? "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ArrowLeft size={18} />
                {isAdmin ? "Admin Dashboard" : "My Bookings"}
              </Link>

              <Link
                to="/rooms"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 transition"
              >
                <BedDouble size={18} />
                Explore More Rooms
              </Link>
            </div>
          </div>
        </div>

        {/* Information Note */}

        <div className={`mt-6 flex items-start gap-3 rounded-xl border p-5 ${cardBg}`}>
          <MapPin
            size={20}
            className="mt-0.5 shrink-0 text-teal-500"
          />

          <div>
            <h4 className={`font-semibold ${headingText}`}>
              Trishul Homestay
            </h4>

            <p className={`mt-1 text-sm ${bodyText}`}>
              {isAdmin
                ? "Review the booking details when managing or assisting the guest with this reservation."
                : "Keep your booking details available when contacting the homestay regarding your reservation."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Small Information Box
// ==========================================

function InfoBox({ icon, label, value, darkMode }) {
  return (
    <div className={`rounded-xl border p-4 ${
      darkMode ? "border-slate-700" : "border-slate-200"
    }`}>
      <div className="flex items-center gap-2 text-teal-500">
        {icon}

        <span className={`text-xs font-semibold uppercase tracking-wide ${
          darkMode ? "text-slate-400" : "text-slate-500"
        }`}>
          {label}
        </span>
      </div>

      <p className={`mt-3 font-bold ${
        darkMode ? "text-white" : "text-slate-900"
      }`}>
        {value}
      </p>
    </div>
  );
}

// ==========================================
// Guest Detail Row
// ==========================================

function DetailRow({ icon, label, value, darkMode }) {
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 ${
      darkMode ? "border-slate-700" : "border-slate-200"
    }`}>
      <div className="mt-1 text-teal-500">
        {icon}
      </div>

      <div className="min-w-0">
        <p className={`text-xs ${
          darkMode ? "text-slate-400" : "text-slate-500"
        }`}>
          {label}
        </p>

        <p className={`mt-1 break-words font-semibold ${
          darkMode ? "text-white" : "text-slate-900"
        }`}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// Booking Status Message
// ==========================================

function StatusMessage({ type, icon, title, message, darkMode }) {
  const styles = {
    green: darkMode
      ? "border-green-800 bg-green-950 text-green-300"
      : "border-green-200 bg-green-50 text-green-700",

    red: darkMode
      ? "border-red-800 bg-red-950 text-red-300"
      : "border-red-200 bg-red-50 text-red-700",

    blue: darkMode
      ? "border-blue-800 bg-blue-950 text-blue-300"
      : "border-blue-200 bg-blue-50 text-blue-700",

    amber: darkMode
      ? "border-amber-800 bg-amber-950 text-amber-300"
      : "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-5 ${styles[type]}`}>
      <div className="mt-0.5 shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="font-bold">
          {title}
        </h4>

        <p className="mt-1 text-sm opacity-90">
          {message}
        </p>
      </div>
    </div>
  );
}
