import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

import {
  User,
  Mail,
  ShieldCheck,
  BedDouble,
  CalendarDays,
  Sparkles,
  ArrowRight,
  Users,
  IndianRupee,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Hotel,
  AlertTriangle,
  Eye,
} from "lucide-react";

// ==========================================
// Quick Actions
// ==========================================

const actions = [
  {
    title: "Explore Rooms",
    desc: "Browse all available homestay rooms.",
    to: "/rooms",
    icon: BedDouble,
  },
  {
    title: "Check Availability",
    desc: "Find available dates before booking.",
    to: "/availability",
    icon: CalendarDays,
  },
  {
    title: "Book Your Stay",
    desc: "Reserve your perfect stay.",
    to: "/booking",
    icon: CalendarDays,
  },
  {
    title: "AI Travel Assistant",
    desc: "Get personalized travel help.",
    isAI: true,
    icon: Sparkles,
  },
];

// ==========================================
// Date Formatter
// ==========================================

const formatDate = (date) => {
  if (!date) return "-";

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
  if (amount === undefined || amount === null) {
    return "-";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

// ==========================================
// Calculate Number of Nights
// ==========================================

const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const difference = end.getTime() - start.getTime();

  if (difference <= 0) return 0;

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
};

// ==========================================
// Booking Status Styles
// ==========================================

const getStatusStyle = (status) => {
  switch (status) {
    case "Confirmed":
      return {
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
        icon: CheckCircle2,
      };

    case "Completed":
      return {
        className:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
        icon: CheckCircle2,
      };

    case "Cancelled":
      return {
        className:
          "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
        icon: XCircle,
      };

    default:
      return {
        className:
          "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
        icon: Clock3,
      };
  }
};

// ==========================================
// Dashboard
// ==========================================

export default function Dashboard() {
  const { user } = useAuth();
  const { darkMode } = useTheme();

const dashboardThemeClasses = darkMode
  ? [
      "[&_.bg-white]:!bg-slate-800",
      "[&_.bg-slate-50]:!bg-slate-800",
      "[&_.text-slate-900]:!text-white",
      "[&_.text-slate-800]:!text-white",
      "[&_.text-slate-700]:!text-slate-200",
      "[&_.text-slate-600]:!text-slate-300",
      "[&_.text-slate-500]:!text-slate-400",
      "[&_.text-gray-900]:!text-white",
      "[&_.text-gray-800]:!text-white",
    ].join(" ")
  : "";

  const [bookings, setBookings] = useState([]);

  const [bookingsLoading, setBookingsLoading] =
    useState(true);

  const [bookingsError, setBookingsError] =
    useState("");

  // ==========================================
  // Cancellation States
  // ==========================================

  const [cancelModalOpen, setCancelModalOpen] =
    useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [cancellingBookingId, setCancellingBookingId] =
    useState(null);

  const [cancelError, setCancelError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  // ==========================================
  // Fetch Logged-in User Bookings
  // ==========================================

  const fetchMyBookings = async () => {
    try {
      setBookingsLoading(true);
      setBookingsError("");

      const response = await api.get("/bookings/my");

      setBookings(response.data?.data || []);
    } catch (error) {
      console.error(
        "Dashboard My Bookings Error:",
        error
      );

      setBookings([]);

      setBookingsError(
        error.response?.data?.message ||
          "Unable to load your bookings."
      );
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchMyBookings();
  }, 0);

  return () => {
    clearTimeout(timer);
  };
}, []);

  // ==========================================
  // Open Cancel Confirmation Modal
  // ==========================================

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelError("");
    setSuccessMessage("");
    setCancelModalOpen(true);
  };

  // ==========================================
  // Close Cancel Confirmation Modal
  // ==========================================

  const closeCancelModal = () => {
    if (cancellingBookingId) {
      return;
    }

    setCancelModalOpen(false);
    setSelectedBooking(null);
    setCancelError("");
  };

  // ==========================================
  // Cancel Booking
  // ==========================================

  const handleCancelBooking = async () => {
    if (!selectedBooking?._id) {
      return;
    }

    try {
      setCancellingBookingId(
        selectedBooking._id
      );

      setCancelError("");
      setSuccessMessage("");

      const response = await api.put(
        `/bookings/${selectedBooking._id}/status`,
        {
          status: "Cancelled",
        }
      );

      const updatedBooking =
        response.data?.data;

      // ======================================
      // Update Booking Locally
      // ======================================

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === selectedBooking._id
            ? updatedBooking || {
                ...booking,
                status: "Cancelled",
              }
            : booking
        )
      );

      setSuccessMessage(
        "Your booking has been cancelled successfully."
      );

      toast.success("Your booking has been cancelled successfully.");

      setCancelModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error(
        "Cancel Booking Error:",
        error
      );

      setCancelError(
        error.response?.data?.message ||
          "Unable to cancel booking. Please try again."
      );
    } finally {
      setCancellingBookingId(null);
    }
  };

  // ==========================================
  // Dynamic Dashboard Stats
  // ==========================================

  const activeBookings = bookings.filter(
    (booking) =>
      booking.status === "Pending" ||
      booking.status === "Confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "Completed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) =>
      booking.status === "Cancelled"
  ).length;

  const stats = [
    {
      label: "Account",
      value: "Active",
    },
    {
      label: "Role",
      value: user?.role || "User",
    },
    {
      label: "My Bookings",
      value: bookingsLoading
        ? "..."
        : bookings.length,
    },
    {
      label: "Active Bookings",
      value: bookingsLoading
        ? "..."
        : activeBookings,
    },
  ];

  return (
    <>
      <div
  className={`max-w-7xl mx-auto px-5 py-8 transition-colors duration-300 ${dashboardThemeClasses}`}
>

        {/* ======================================
            Welcome Banner
        ====================================== */}

        <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-emerald-600 text-white p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome
            {user?.name
              ? `, ${user.name}`
              : ""}{" "}
            👋
          </h1>

          <p className="mt-3 text-teal-50 max-w-2xl">
            Manage your bookings, explore rooms,
            check availability and enjoy a seamless
            direct booking experience with Trishul
            Homestay.
          </p>
        </div>

        {/* ======================================
            Stats
        ====================================== */}

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5 mt-8">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.label}
              </p>

              <h3 className="text-2xl font-bold mt-2 capitalize">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* ======================================
            Quick Actions + Profile
        ====================================== */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* Quick Actions */}

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {actions.map((item) => {
                const Icon = item.icon;

                const ActionWrapper = item.isAI ? "button" : Link;
                const actionProps = item.isAI
                  ? {
                      type: "button",
                      onClick: () =>
                        window.dispatchEvent(new Event("open-ai-chat")),
                    }
                  : { to: item.to };

                return (
                  <ActionWrapper
                    key={item.title}
                    {...actionProps}
                    className="group w-full text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl transition"
                  >
                    <div className="w-14 h-14 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                      <Icon
                        className="text-teal-700 dark:text-teal-300"
                        size={28}
                      />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      {item.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-teal-700 dark:text-teal-400 font-semibold">
                      Open

                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition"
                      />
                    </div>
                  </ActionWrapper>
                );
              })}
            </div>
          </div>

          {/* Profile */}

          <div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">

              <h2 className="text-2xl font-bold mb-6">
                Profile
              </h2>

              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-teal-700 text-white flex items-center justify-center">
                  <User size={42} />
                </div>
              </div>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-3">
                  <User className="text-teal-700" />

                  <div>
                    <p className="text-xs text-slate-500">
                      Name
                    </p>

                    <p className="font-semibold">
                      {user?.name || "Guest"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-teal-700" />

                  <div>
                    <p className="text-xs text-slate-500">
                      Email
                    </p>

                    <p className="font-semibold break-all">
                      {user?.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-teal-700" />

                  <div>
                    <p className="text-xs text-slate-500">
                      Role
                    </p>

                    <p className="font-semibold capitalize">
                      {user?.role || "User"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Dashboard Information */}
<div
  className={`mt-8 rounded-xl p-4 transition-colors duration-300 ${
    darkMode
      ? "bg-slate-800 border border-slate-700"
      : "bg-teal-50 border border-teal-100"
  }`}
>
  <p
    className={`font-semibold ${
      darkMode
        ? "text-white"
        : "text-slate-900"
    }`}
  >
    Booking Dashboard
  </p>

  <p
    className={`text-sm mt-2 leading-relaxed ${
      darkMode
        ? "text-slate-300"
        : "text-slate-600"
    }`}
  >
    View and manage your Trishul
    Homestay booking activity securely
    from your account.
  </p>
</div>
            </div>
          </div>
        </div>

        {/* ======================================
            My Bookings
        ====================================== */}

        <section className="mt-12">

          {/* Section Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

            <div>
              <p className="text-teal-700 dark:text-teal-400 font-semibold text-sm uppercase tracking-wider">
                Booking History
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-1">
                My Bookings
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                View and manage your current and
                previous booking requests.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchMyBookings}
              disabled={bookingsLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition disabled:opacity-60"
            >
              <RefreshCw
                size={18}
                className={
                  bookingsLoading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>
          </div>

          {/* ====================================
              Success Message
          ==================================== */}

          {successMessage && (
            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="text-emerald-600 shrink-0 mt-0.5"
                />

                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Booking Cancelled
                  </p>

                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              Loading State
          ==================================== */}

          {bookingsLoading && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 shadow-sm">
              <div className="flex flex-col items-center justify-center text-center">

                <Loader2
                  size={36}
                  className="animate-spin text-teal-700"
                />

                <p className="mt-4 font-semibold">
                  Loading your bookings...
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Please wait while we fetch your
                  booking history.
                </p>
              </div>
            </div>
          )}

          {/* ====================================
              Error State
          ==================================== */}

          {!bookingsLoading &&
            bookingsError && (
              <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-6">

                <div className="flex items-start gap-3">
                  <XCircle
                    className="text-red-600 shrink-0"
                    size={24}
                  />

                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-300">
                      Unable to load bookings
                    </h3>

                    <p className="mt-1 text-red-600 dark:text-red-400">
                      {bookingsError}
                    </p>

                    <button
                      type="button"
                      onClick={fetchMyBookings}
                      className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      <RefreshCw size={17} />
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

          {/* ====================================
              Empty State
          ==================================== */}

          {!bookingsLoading &&
            !bookingsError &&
            bookings.length === 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 shadow-sm text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <Hotel
                    size={30}
                    className="text-teal-700 dark:text-teal-300"
                  />
                </div>

                <h3 className="text-xl font-bold mt-5">
                  No bookings yet
                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  You haven't made any bookings yet.
                  Explore our rooms and reserve your
                  perfect stay.
                </p>

                <Link
                  to="/availability"
                  className="mt-6 inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                  Check Availability
                  <ArrowRight size={18} />
                </Link>
              </div>
            )}

          {/* ====================================
              Booking Cards
          ==================================== */}

          {!bookingsLoading &&
            !bookingsError &&
            bookings.length > 0 && (
              <div className="grid lg:grid-cols-2 gap-6">

                {bookings.map((booking) => {
                  const room = booking.roomId;

                  const statusInfo =
                    getStatusStyle(
                      booking.status
                    );

                  const StatusIcon =
                    statusInfo.icon;

                  const nights =
                    calculateNights(
                      booking.checkIn,
                      booking.checkOut
                    );

                  const estimatedTotal =
                    room?.price && nights
                      ? room.price * nights
                      : null;

                  // User can cancel only
                  // Pending or Confirmed booking

                  const canCancel =
                    booking.status === "Pending" ||
                    booking.status ===
                      "Confirmed";

                  return (
                    <article
                      key={booking._id}
                      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden hover:shadow-lg transition"
                    >

                      {/* Card Header */}

                      <div className="p-6 border-b border-slate-100 dark:border-slate-800">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                          <div className="flex items-start gap-4">

                            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0">
                              <BedDouble
                                size={24}
                                className="text-teal-700 dark:text-teal-300"
                              />
                            </div>

                            <div>
                              <p className="text-xs uppercase tracking-wider text-slate-500">
                                Room
                              </p>

                              <h3 className="text-xl font-bold mt-1">
                                {room?.name ||
                                  "Room"}
                              </h3>

                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Booking ID:{" "}
                                {booking._id
                                  ?.slice(-8)
                                  .toUpperCase()}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo.className}`}
                          >
                            <StatusIcon
                              size={16}
                            />

                            {booking.status ||
                              "Pending"}
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}

                      <div className="p-6">

                        <div className="grid sm:grid-cols-2 gap-5">

                          {/* Check In */}

                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Check-In
                            </p>

                            <div className="flex items-center gap-2 mt-1 font-semibold">
                              <CalendarDays
                                size={17}
                                className="text-teal-700"
                              />

                              {formatDate(
                                booking.checkIn
                              )}
                            </div>
                          </div>

                          {/* Check Out */}

                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Check-Out
                            </p>

                            <div className="flex items-center gap-2 mt-1 font-semibold">
                              <CalendarDays
                                size={17}
                                className="text-teal-700"
                              />

                              {formatDate(
                                booking.checkOut
                              )}
                            </div>
                          </div>

                          {/* Guests */}

                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Guests
                            </p>

                            <div className="flex items-center gap-2 mt-1 font-semibold">
                              <Users
                                size={17}
                                className="text-teal-700"
                              />

                              {booking.guests}{" "}
                              {booking.guests === 1
                                ? "Guest"
                                : "Guests"}
                            </div>
                          </div>

                          {/* Nights */}

                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Duration
                            </p>

                            <div className="flex items-center gap-2 mt-1 font-semibold">
                              <Clock3
                                size={17}
                                className="text-teal-700"
                              />

                              {nights}{" "}
                              {nights === 1
                                ? "Night"
                                : "Nights"}
                            </div>
                          </div>
                        </div>

                        {/* Price */}

                        {room?.price && (
                          <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800 p-4">

                            <div className="flex flex-wrap items-center justify-between gap-3">

                              <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  Room Price
                                </p>

                                <div className="flex items-center mt-1">

                                  <IndianRupee
                                    size={17}
                                    className="text-teal-700"
                                  />

                                  <span className="font-bold">
                                    {new Intl.NumberFormat(
                                      "en-IN"
                                    ).format(
                                      room.price
                                    )}
                                  </span>

                                  <span className="text-sm text-slate-500 ml-1">
                                    / night
                                  </span>
                                </div>
                              </div>

                              {estimatedTotal !==
                                null && (
                                <div className="text-right">

                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Estimated Total
                                  </p>

                                  <p className="font-bold text-lg text-teal-700 dark:text-teal-400 mt-1">
                                    {formatCurrency(
                                      estimatedTotal
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Guest */}

                        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">

                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Guest
                          </p>

                          <p className="font-semibold mt-1">
                            {booking.guestName}
                          </p>

                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-all">
                            {booking.email}
                          </p>
                        </div>

                        {/* Special Request */}

                        {booking.specialRequest && (
                          <div className="mt-5">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Special Request
                            </p>

                            <p className="mt-1 text-sm">
                              {
                                booking.specialRequest
                              }
                            </p>
                          </div>
                        )}

                        {/* Created Date */}

                        <div className="mt-5 text-xs text-slate-400">
                          Booking requested on{" "}
                          {formatDate(
                            booking.createdAt
                          )}
                        </div>

                        {/* ==================================
                            Booking Actions
                        ================================== */}

                        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">

                          <div className="flex flex-col sm:flex-row gap-3">

                            {/* View Details */}
                            
                            <Link
                              to={`/booking/${booking._id}`}
                              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition font-semibold"
                            >
                              <Eye size={18} />

                              View Details
                            </Link>

                            {/* Cancel Booking */}

                            {canCancel && (
                              <button
                                type="button"
                                onClick={() =>
                                  openCancelModal(
                                    booking
                                  )
                                }
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-700 transition font-semibold"
                              >
                                <XCircle
                                  size={18}
                                />

                                Cancel Booking
                              </button>
                            )}
                          </div>

                          {canCancel && (
                            <p className="text-xs text-slate-400 mt-2">
                              Cancelling will release
                              this room for the selected
                              dates.
                            </p>
                          )}
                        </div>

                        {/* Cancelled Information */}

                        {booking.status ===
                          "Cancelled" && (
                          <div className="mt-6 rounded-xl border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-4">

                            <div className="flex items-start gap-3">

                              <XCircle
                                size={20}
                                className="text-red-600 shrink-0 mt-0.5"
                              />

                              <div>
                                <p className="font-semibold text-red-700 dark:text-red-300">
                                  Booking Cancelled
                                </p>

                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                  This booking has been
                                  cancelled and is no
                                  longer active.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Completed Information */}

                        {booking.status ===
                          "Completed" && (
                          <div className="mt-6 rounded-xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 p-4">

                            <div className="flex items-start gap-3">

                              <CheckCircle2
                                size={20}
                                className="text-emerald-600 shrink-0 mt-0.5"
                              />

                              <div>
                                <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                                  Stay Completed
                                </p>

                                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                                  This booking has been
                                  completed successfully.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

          {/* ====================================
              Booking Summary
          ==================================== */}

          {!bookingsLoading &&
            !bookingsError &&
            bookings.length > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm">

                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">

                  <span>
                    Total Bookings:{" "}
                    <strong>
                      {bookings.length}
                    </strong>
                  </span>

                  <span>
                    Active:{" "}
                    <strong>
                      {activeBookings}
                    </strong>
                  </span>

                  <span>
                    Completed:{" "}
                    <strong>
                      {completedBookings}
                    </strong>
                  </span>

                  <span>
                    Cancelled:{" "}
                    <strong>
                      {cancelledBookings}
                    </strong>
                  </span>
                </div>
              </div>
            )}
        </section>
      </div>

      {/* ========================================
          Cancel Booking Confirmation Modal
      ======================================== */}

      {cancelModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">

            {/* Modal Header */}

            <div className="p-6 border-b border-slate-200 dark:border-slate-700">

              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center mb-4">

                <AlertTriangle
                  size={28}
                  className="text-red-600"
                />
              </div>

              <h2 className="text-2xl font-bold">
                Cancel Booking?
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Are you sure you want to cancel your
                booking for{" "}
                <strong className="text-slate-900 dark:text-white">
                  {selectedBooking.roomId?.name ||
                    "this room"}
                </strong>
                ?
              </p>
            </div>

            {/* Modal Details */}

            <div className="p-6">

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 space-y-3">

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Check-In
                  </span>

                  <span className="font-semibold">
                    {formatDate(
                      selectedBooking.checkIn
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Check-Out
                  </span>

                  <span className="font-semibold">
                    {formatDate(
                      selectedBooking.checkOut
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">
                    Guests
                  </span>

                  <span className="font-semibold">
                    {selectedBooking.guests}
                  </span>
                </div>
              </div>

              {/* Error */}

              {cancelError && (
                <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3">

                  <p className="text-sm text-red-700 dark:text-red-300">
                    {cancelError}
                  </p>
                </div>
              )}

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Once cancelled, this booking will no
                longer be considered active.
              </p>

              {/* Buttons */}

              <div className="grid grid-cols-2 gap-3 mt-6">

                <button
                  type="button"
                  onClick={closeCancelModal}
                  disabled={
                    Boolean(
                      cancellingBookingId
                    )
                  }
                  className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition font-semibold disabled:opacity-50"
                >
                  Keep Booking
                </button>

                <button
                  type="button"
                  onClick={
                    handleCancelBooking
                  }
                  disabled={
                    Boolean(
                      cancellingBookingId
                    )
                  }
                  className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {cancellingBookingId ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle size={18} />

                      Yes, Cancel
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}